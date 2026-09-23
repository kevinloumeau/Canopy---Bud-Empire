import UIKit
import Capacitor
import WebKit

/// The bottom tab bar is the one piece of chrome that is native rather than web.
///
/// Apple's material guidance puts Liquid Glass on the functional layer — tab bars, toolbars, sidebars — and
/// explicitly keeps it out of the content layer. The real material cannot be reached from CSS: a web view has
/// `backdrop-filter` and nothing more, which is an approximation of blur rather than the material itself. So the
/// tabs live here, in a `UIVisualEffectView` that samples the running game behind it, while every other control
/// stays in the page where it already works. The sheet's own tab strip is hidden when running natively.
///
/// State is shared both ways: a tap here drives the web app's `showTray`, and the web app posts back whenever it
/// changes tab itself — which it does on its own, for instance when visiting a branch store.
final class CanopyViewController: CAPBridgeViewController, WKScriptMessageHandler, UIGestureRecognizerDelegate {

    private struct Tab {
        /// The web app's own `data-tray` value; the bridge speaks in these.
        let key: String
        let title: String
        let symbol: String
    }

    private let tabs: [Tab] = [
        Tab(key: "factory",   title: "Stations",   symbol: "square.stack.3d.up"),
        Tab(key: "employees", title: "Staff",      symbol: "person"),
        Tab(key: "flowers",   title: "Menu",       symbol: "leaf"),
        Tab(key: "orders",    title: "Deliveries", symbol: "shippingbox"),
        Tab(key: "boosts",    title: "Shop",       symbol: "bag"),
        Tab(key: "empire",    title: "Empire",     symbol: "crown")
    ]

    /// The shop's own palette, so the selected tab reads as Canopy rather than as system blue. This is the web
    /// tray's own value: it had to be lightened while the lozenge brightened the ground under it, and now that the
    /// lozenge sinks instead there is room for the real one again.
    private let accent = UIColor(red: 0.71, green: 0.78, blue: 0.52, alpha: 1)      // #b6c885
    private let resting = UIColor(red: 0.86, green: 0.90, blue: 0.84, alpha: 0.92)

    /// The game asks for haptics through `navigator.vibrate`, which WKWebView does not implement — so until these
    /// existed, every tap in the shop was silent on iOS. They are held rather than built per tap so `prepare()`
    /// has somewhere to warm up; a generator created at the moment of the tap fires late enough to read as a
    /// separate event from the touch rather than as part of it.
    private let selectionHaptic = UISelectionFeedbackGenerator()
    private let lightHaptic = UIImpactFeedbackGenerator(style: .light)
    private let firmHaptic = UIImpactFeedbackGenerator(style: .medium)

    private weak var tabBar: UIVisualEffectView?
    private weak var tabRow: UIStackView?
    private var buttons: [UIButton] = []
    private var badgeDots: [UIView] = []
    private var selectedKey = "factory"
    /// The lozenge that sits behind the selected tab. It is a glass element in its own right, so inside a
    /// `UIGlassContainerEffect` it fuses with the bar's own glass rather than sitting on top of it.
    private var bubble: UIVisualEffectView?
    private var bubbleCentre: NSLayoutConstraint?

    override func viewDidLoad() {
        super.viewDidLoad()
        webView?.configuration.userContentController.add(self, name: "canopyTray")
        webView?.configuration.userContentController.add(self, name: "canopyHaptic")
        installTabBar()
        NotificationCenter.default.addObserver(
            self, selector: #selector(powerStateChanged),
            name: .NSProcessInfoPowerStateDidChange, object: nil)
    }

    // MARK: - The bar

    private func installTabBar() {
        // A glass *container* rather than a single glass view: nested glass elements inside it are rendered as
        // one combined shape, and `spacing` is the distance at which they begin to merge. That is what lets the
        // selection lozenge fuse into the bar instead of floating as a separate pane on top of it.
        let barEffect: UIVisualEffect
        if #available(iOS 26.0, *) {
            let container = UIGlassContainerEffect()
            container.spacing = 18
            barEffect = container
        } else {
            barEffect = UIBlurEffect(style: .systemThinMaterialDark)
        }

        let bar = UIVisualEffectView(effect: barEffect)
        bar.translatesAutoresizingMaskIntoConstraints = false
        bar.layer.cornerRadius = 30
        bar.layer.cornerCurve = .continuous
        bar.clipsToBounds = true
        // Left to adapt, the glass reads light over the shop and the labels on it end up light-on-light, which
        // fails contrast. The game is dark in both system appearances, so the bar is pinned dark and the labels
        // can stay light — the monochromatic pairing the material guidance asks for, just decided rather than
        // inferred.
        bar.overrideUserInterfaceStyle = .dark
        tabBar = bar
        view.addSubview(bar)

        // Element one: the bar's own body, filling the container.
        if #available(iOS 26.0, *) {
            let body = UIVisualEffectView(effect: UIGlassEffect(style: .regular))
            body.translatesAutoresizingMaskIntoConstraints = false
            // Each nested element carries its own shape: the container combines them, it does not inherit the
            // outer view's rounding, so without this the body renders as a hard rectangle.
            body.layer.cornerRadius = 30
            body.layer.cornerCurve = .continuous
            body.clipsToBounds = true
            body.overrideUserInterfaceStyle = .dark
            bar.contentView.addSubview(body)
            NSLayoutConstraint.activate([
                body.topAnchor.constraint(equalTo: bar.contentView.topAnchor),
                body.bottomAnchor.constraint(equalTo: bar.contentView.bottomAnchor),
                body.leadingAnchor.constraint(equalTo: bar.contentView.leadingAnchor),
                body.trailingAnchor.constraint(equalTo: bar.contentView.trailingAnchor)
            ])

            // Element two: the selection lozenge, which slides between tabs and merges with the body as it goes.
            //
            // Neutral rather than green, on two counts from Apple's colour guidance. Background colour on Liquid
            // Glass is reserved for primary actions — "to emphasize primary actions, apply color to the
            // background rather than to symbols or text" — while a selected tab is the case where the symbol and
            // text carry the colour, which they do below. And the shop's content is already green, so a green
            // control over it is the overlap the guidance warns about for colourful apps.
            //
            // Darker rather than lighter, which is the part I had backwards: the system's own selected tab sinks
            // a dimmer capsule into the bar instead of lifting a brighter one. It also reads better here, since
            // the label sits light on top of it.
            //
            // `isInteractive` is what gives the material its own behaviour under a finger — the gel flex, and the
            // lensing and chromatic fringing as it travels. Without it the lozenge is only a shape that moves.
            let lozengeGlass = UIGlassEffect(style: .regular)
            lozengeGlass.isInteractive = true
            lozengeGlass.tintColor = UIColor.black.withAlphaComponent(0.22)
            let lozenge = UIVisualEffectView(effect: lozengeGlass)
            lozenge.translatesAutoresizingMaskIntoConstraints = false
            lozenge.layer.cornerRadius = 22
            lozenge.layer.cornerCurve = .continuous
            lozenge.clipsToBounds = true
            lozenge.overrideUserInterfaceStyle = .dark
            bar.contentView.addSubview(lozenge)
            bubble = lozenge
            let centre = lozenge.centerXAnchor.constraint(equalTo: bar.contentView.leadingAnchor)
            bubbleCentre = centre
            NSLayoutConstraint.activate([
                centre,
                lozenge.centerYAnchor.constraint(equalTo: bar.contentView.centerYAnchor),
                lozenge.heightAnchor.constraint(equalToConstant: 44),
                lozenge.widthAnchor.constraint(equalToConstant: 62)
            ])
        }

        let row = UIStackView()
        tabRow = row
        row.accessibilityContainerType = .semanticGroup
        row.axis = .horizontal
        row.distribution = .fillEqually
        row.alignment = .fill
        row.translatesAutoresizingMaskIntoConstraints = false
        bar.contentView.addSubview(row)

        for (index, tab) in tabs.enumerated() {
            let button = UIButton(type: .system)
            var config = UIButton.Configuration.plain()
            config.image = UIImage(systemName: tab.symbol)
            config.title = tab.title
            config.imagePlacement = .top
            config.imagePadding = 3
            config.contentInsets = NSDirectionalEdgeInsets(top: 8, leading: 2, bottom: 8, trailing: 2)
            config.preferredSymbolConfigurationForImage = UIImage.SymbolConfiguration(pointSize: 17, weight: .medium)
            // The label tracks the reader's text size rather than sitting at a fixed 11pt. It is capped at 13:
            // six tabs share the width of the screen, and past that the longest of them ("Deliveries") starts
            // colliding with its neighbours no matter how it is shrunk. Beyond the cap the shrink-to-fit below
            // takes over, so the text keeps growing in the reader's other apps without breaking the row here.
            config.titleTextAttributesTransformer = UIConfigurationTextAttributesTransformer { attrs in
                var out = attrs
                out.font = UIFontMetrics(forTextStyle: .caption2).scaledFont(
                    for: .systemFont(ofSize: 11, weight: .semibold), maximumPointSize: 13)
                return out
            }
            button.configuration = config
            button.titleLabel?.adjustsFontSizeToFitWidth = true
            button.titleLabel?.minimumScaleFactor = 0.82
            button.tag = index
            button.addTarget(self, action: #selector(tabTapped(_:)), for: .touchUpInside)
            row.addArrangedSubview(button)
            buttons.append(button)

            let dot = UIView()
            dot.translatesAutoresizingMaskIntoConstraints = false
            dot.backgroundColor = UIColor(red: 0.95, green: 0.78, blue: 0.31, alpha: 1)
            dot.layer.cornerRadius = 3.5
            dot.isHidden = true
            dot.isUserInteractionEnabled = false
            bar.contentView.addSubview(dot)
            badgeDots.append(dot)
            NSLayoutConstraint.activate([
                dot.widthAnchor.constraint(equalToConstant: 7),
                dot.heightAnchor.constraint(equalToConstant: 7),
                dot.centerXAnchor.constraint(equalTo: button.centerXAnchor, constant: 11),
                dot.centerYAnchor.constraint(equalTo: button.topAnchor, constant: 11)
            ])
        }

        NSLayoutConstraint.activate([
            bar.leadingAnchor.constraint(equalTo: view.safeAreaLayoutGuide.leadingAnchor, constant: 10),
            bar.trailingAnchor.constraint(equalTo: view.safeAreaLayoutGuide.trailingAnchor, constant: -10),
            bar.bottomAnchor.constraint(equalTo: view.safeAreaLayoutGuide.bottomAnchor, constant: -4),
            bar.heightAnchor.constraint(equalToConstant: 60),
            row.topAnchor.constraint(equalTo: bar.contentView.topAnchor),
            row.bottomAnchor.constraint(equalTo: bar.contentView.bottomAnchor),
            row.leadingAnchor.constraint(equalTo: bar.contentView.leadingAnchor, constant: 4),
            row.trailingAnchor.constraint(equalTo: bar.contentView.trailingAnchor, constant: -4)
        ])

        // Dragging along the bar moves the selection with the finger rather than only on lift. This is the
        // gesture the material is built for: the lozenge stretches and lenses as it travels between tabs, which
        // never happens if selection can only jump on a tap.
        let scrub = UIPanGestureRecognizer(target: self, action: #selector(barScrubbed(_:)))
        scrub.delegate = self
        bar.addGestureRecognizer(scrub)

        paint()
    }

    @objc private func barScrubbed(_ gesture: UIPanGestureRecognizer) {
        guard gesture.state == .began || gesture.state == .changed, let row = tabRow else { return }
        let point = gesture.location(in: row)
        guard let hit = buttons.first(where: { $0.frame.contains(point) }) else { return }
        select(tabs[hit.tag])
    }

    /// Colour carries the selection. The guidance is to tint the label rather than fill the background for a
    /// selected tab, and to keep background colour for a single primary action — which a tab bar does not have.
    private func paint(animated: Bool = false) {
        for (index, tab) in tabs.enumerated() {
            let chosen = tab.key == selectedKey
            buttons[index].tintColor = chosen ? accent : resting
            buttons[index].configuration?.baseForegroundColor = chosen ? accent : resting
            buttons[index].accessibilityLabel = tab.title
            // `.selected` rather than a spoken value: VoiceOver says "selected" itself, in the reader's own
            // language, and a hardcoded English string here would not have translated.
            buttons[index].accessibilityTraits = chosen ? [.button, .selected] : [.button]
        }
        moveLozenge(animated: animated)
    }

    /// Slides the lozenge under the selected tab. The glass container does the fusing; this only has to put it in
    /// the right place, and give it the settling motion the material is meant to have.
    private func moveLozenge(animated: Bool) {
        guard let bubble, let centre = bubbleCentre,
              let index = tabs.firstIndex(where: { $0.key == selectedKey }),
              index < buttons.count else { return }
        view.layoutIfNeeded()
        let target = buttons[index].convert(buttons[index].bounds, to: bubble.superview).midX
        guard centre.constant != target else { return }
        centre.constant = target
        // A tab change is a small, frequent move, so the bounce stays slight — and disappears entirely for anyone
        // who has asked the system for less motion.
        guard animated, !UIAccessibility.isReduceMotionEnabled else {
            bubble.superview?.layoutIfNeeded()
            return
        }
        // The older spring API rather than iOS 17's springDuration/bounce, so the deployment target is untouched.
        UIView.animate(withDuration: 0.42, delay: 0, usingSpringWithDamping: 0.72, initialSpringVelocity: 0,
                       options: [.allowUserInteraction, .beginFromCurrentState]) {
            bubble.superview?.layoutIfNeeded()
        }
    }

    override func viewDidAppear(_ animated: Bool) {
        super.viewDidAppear(animated)
        selectionHaptic.prepare()
    }

    override func traitCollectionDidChange(_ previous: UITraitCollection?) {
        super.traitCollectionDidChange(previous)
        // The configuration's font is resolved once when it is built, so a text-size change has to ask for it again.
        guard traitCollection.preferredContentSizeCategory != previous?.preferredContentSizeCategory else { return }
        buttons.forEach { $0.setNeedsUpdateConfiguration() }
    }

    override func viewDidLayoutSubviews() {
        super.viewDidLayoutSubviews()
        // The buttons have no width until the stack view has laid out, so the first placement happens here.
        moveLozenge(animated: false)
    }

    /// The scrub runs alongside the buttons' own tracking: a plain tap still belongs to the button under it, and
    /// only once the finger travels does this take over.
    func gestureRecognizer(_ gesture: UIGestureRecognizer,
                           shouldRecognizeSimultaneouslyWith other: UIGestureRecognizer) -> Bool { true }

    // MARK: - Standing down

    private var barHidden = false

    /// The opening walkthrough and the age gate each take the whole screen, and the web app says so. The bar drops
    /// out of the way rather than floating over them — during the guide it otherwise covers the very buttons the
    /// step is pointing at.
    ///
    /// It leaves the accessibility tree at the same time: a control that has slid off screen should not still be
    /// reachable by VoiceOver, and its tabs are not usable during either of these anyway.
    private func setBarHidden(_ hidden: Bool) {
        guard hidden != barHidden, let bar = tabBar else { return }
        barHidden = hidden
        bar.isUserInteractionEnabled = !hidden
        bar.accessibilityElementsHidden = hidden

        let settle = {
            bar.alpha = hidden ? 0 : 1
            // Far enough to clear the bar's own height and the inset below it.
            bar.transform = hidden ? CGAffineTransform(translationX: 0, y: 96) : .identity
        }
        guard !UIAccessibility.isReduceMotionEnabled else { return settle() }
        UIView.animate(withDuration: 0.3, delay: 0, options: [.beginFromCurrentState, .curveEaseInOut],
                       animations: settle)
    }

    // MARK: - Power

    /// The shop renders continuously and people leave it running, so it is the kind of app Low Power Mode is
    /// asking to ease off. The web side halves its frame rate when this is set; it decides what to do with the
    /// fact, this only reports it.
    ///
    /// Pushed rather than polled, and re-pushed whenever the web app next speaks, because a value evaluated
    /// before the page has loaded lands nowhere and there is no callback that tells us it is ready.
    private var powerStatePushed = false

    @objc private func powerStateChanged() {
        powerStatePushed = false
        pushPowerState()
    }

    private func pushPowerState() {
        let saving = ProcessInfo.processInfo.isLowPowerModeEnabled
        webView?.evaluateJavaScript("window.canopyPowerSaver=\(saving)") { [weak self] _, error in
            if error == nil { self?.powerStatePushed = true }
        }
    }

    // MARK: - Haptics

    /// Plays one of the three weights the game asks for, then re-arms that generator: `prepare()` keeps the Taptic
    /// Engine spun up for a moment, and the next tap in a shop is usually close behind. The system's own Haptics
    /// switch is honoured by these generators, so there is nothing to check here.
    private func playHaptic(_ kind: String) {
        switch kind {
        case "light": lightHaptic.impactOccurred();     lightHaptic.prepare()
        case "firm":  firmHaptic.impactOccurred();      firmHaptic.prepare()
        default:      selectionHaptic.selectionChanged(); selectionHaptic.prepare()
        }
    }

    // MARK: - Native to web

    @objc private func tabTapped(_ sender: UIButton) {
        select(tabs[sender.tag])
    }

    /// The one way a tab is chosen, by tap or by scrub.
    private func select(_ tab: Tab) {
        // The web tray's own tabs are hidden natively, so this would otherwise be the one control in the app that
        // moves the whole screen without being felt. Landing on the tab already showing stays quiet — which also
        // keeps a scrub from buzzing continuously while the finger sits still inside one tab.
        guard tab.key != selectedKey else { return }
        playHaptic("select")
        selectedKey = tab.key
        paint(animated: true)
        let escaped = tab.key.replacingOccurrences(of: "'", with: "")
        webView?.evaluateJavaScript("window.canopyNativeTray&&window.canopyNativeTray.select('\(escaped)')")
    }

    // MARK: - Web to native

    func userContentController(_ controller: WKUserContentController, didReceive message: WKScriptMessage) {
        guard let payload = message.body as? [String: Any] else { return }
        if message.name == "canopyHaptic" {
            playHaptic(payload["kind"] as? String ?? "select")
            return
        }
        guard message.name == "canopyTray" else { return }
        if !powerStatePushed { pushPowerState() }
        if let active = payload["active"] as? String, tabs.contains(where: { $0.key == active }) {
            selectedKey = active
            paint(animated: true)
        }
        if let hidden = payload["hidden"] as? Bool {
            setBarHidden(hidden)
        }
        if let badges = payload["badges"] as? [String] {
            for (index, tab) in tabs.enumerated() {
                badgeDots[index].isHidden = !badges.contains(tab.key)
            }
        }
    }
}
