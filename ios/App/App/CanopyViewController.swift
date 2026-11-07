import UIKit
import Capacitor
import WebKit

/// Metal renders the map beneath the web controls; UIKit supplies the native tab bar.
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
        Tab(key: "flowers",   title: "Menu",       symbol: "leaf"),
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
    /// Set when the web layout is wide enough that the sheet became a side panel; the bar then tracks the panel
    /// instead of the window, so it stays under the thing it controls.
    private var anchorLeading: NSLayoutConstraint?
    private var anchorWidth: NSLayoutConstraint?
    private var centredRules: [NSLayoutConstraint] = []
    private weak var tabRow: UIStackView?
    private var buttons: [UIButton] = []
    private var badgeDots: [UIView] = []
    private var selectedKey = "factory"
    private var panelExpanded = true
    private var loadingCover: UIView?
    /// The loading bar over the scrim at the foot of the art: a glowing lime fill grows inside a cream-rimmed track
    /// its leading end. It only ever moves forward.
    private weak var loadBar: UIView?
    private var loadFillWidth: NSLayoutConstraint?
    private var loadShown: CGFloat = 0
    /// Keeps the web view at 1x; see capacitorDidLoad.
    private var pageZoom: NSKeyValueObservation?
    private var pageProgress: NSKeyValueObservation?
    /// Lifts the cover if loading stalls, so the web loader's own Retry button is never hidden behind it.
    private var stallTimer: DispatchWorkItem?
    private var nativeMap: CanopyMapRenderer?
    /// The lozenge that sits behind the selected tab. It is a glass element in its own right, so inside a
    /// `UIGlassContainerEffect` it fuses with the bar's own glass rather than sitting on top of it.
    private var bubble: UIVisualEffectView?
    private var bubbleCentre: NSLayoutConstraint?

    override func viewDidLoad() {
        super.viewDidLoad()
        webView?.configuration.userContentController.add(self, name: "canopyTray")
        webView?.configuration.userContentController.add(self, name: "canopyHaptic")
        installTabBar()
        setBarHidden(true)
        installLoadingCover()
        NotificationCenter.default.addObserver(
            self, selector: #selector(powerStateChanged),
            name: .NSProcessInfoPowerStateDidChange, object: nil)
    }

    override func capacitorDidLoad() {
        super.capacitorDidLoad()
        // The game pans and zooms itself and its panels scroll inside the page. The web view's own scroll view must
        // stay put: a stray drag or rubber-band would slide the web layer against the native map beneath it.
        if let scroll = webView?.scrollView {
            scroll.isScrollEnabled = false
            scroll.bounces = false
            scroll.alwaysBounceVertical = false
            scroll.alwaysBounceHorizontal = false
            scroll.contentInsetAdjustmentBehavior = .never
            scroll.pinchGestureRecognizer?.isEnabled = false
            // Nor may it zoom: a double tap on the menu once enlarged the whole page and pushed the UI off screen.
            // The page's viewport and touch-action already forbid it; this pins the scale natively too, and snaps
            // back at once if WebKit ever changes it (it can reset zoom limits when the viewport is re-read).
            scroll.minimumZoomScale = 1
            scroll.maximumZoomScale = 1
            scroll.bouncesZoom = false
            scroll.setZoomScale(1, animated: false)
            pageZoom = scroll.observe(\.zoomScale, options: [.new]) { scroll, _ in
                guard abs(scroll.zoomScale - 1) > 0.001 else { return }
                DispatchQueue.main.async {
                    scroll.minimumZoomScale = 1
                    scroll.maximumZoomScale = 1
                    scroll.setZoomScale(1, animated: false)
                    scroll.contentOffset = .zero
                }
            }
        }
        installNativeMap()
    }

    private func installNativeMap() {
        guard let webView else { return }
        #if DEBUG
        if let script = ProcessInfo.processInfo.environment["CANOPY_MAP_REVIEW_SCRIPT"] {
            let controller = webView.configuration.userContentController
            controller.add(self, name: "canopyMapReview")
            controller.addUserScript(WKUserScript(source: script, injectionTime: .atDocumentStart, forMainFrameOnly: true))
        }
        #endif
        guard let map = CanopyMapRenderer(frame: view.bounds) else { return }
        // Capacitor initially makes its web view the root. A sibling native surface needs a container.
        let container = UIView(frame: view.bounds)
        container.backgroundColor = UIColor(red: 0.2, green: 0.29, blue: 0.24, alpha: 1)
        webView.removeFromSuperview()
        webView.frame = container.bounds
        webView.autoresizingMask = [.flexibleWidth, .flexibleHeight]
        container.addSubview(webView)
        view = container
        nativeMap = map
        view.insertSubview(map.mapView, belowSubview: webView)
        webView.isOpaque = false
        webView.backgroundColor = .clear
        webView.scrollView.backgroundColor = .clear
        let controller = webView.configuration.userContentController
        controller.add(self, name: "canopyMap")
        let characterKinds = map.availableCharacterKinds.map(String.init).joined(separator: ",")
        let nativeAvailability = "window.canopyNativeMapAvailable=true;window.canopyNativeCharacterKinds=[\(characterKinds)];"
        controller.addUserScript(WKUserScript(source: nativeAvailability, injectionTime: .atDocumentStart, forMainFrameOnly: true))
        // Also covers Capacitor having already begun the first navigation.
        webView.evaluateJavaScript(nativeAvailability)
    }

    // The launch storyboard shows this same frame (Kevin's background, the scrim, the empty track, laid out by the same constraints), so the hand-off is invisible; from here the badge drops in, the bar fills
    // and the line of text fades in.
    private func installLoadingCover() {
        let cover = UIView()
        cover.backgroundColor = UIColor(red: 15/255, green: 45/255, blue: 26/255, alpha: 1)
        cover.translatesAutoresizingMaskIntoConstraints = false
        cover.accessibilityViewIsModal = true
        cover.clipsToBounds = true
        view.addSubview(cover)
        loadingCover = cover
        NSLayoutConstraint.activate([
            cover.leadingAnchor.constraint(equalTo: view.leadingAnchor),
            cover.trailingAnchor.constraint(equalTo: view.trailingAnchor),
            cover.topAnchor.constraint(equalTo: view.topAnchor),
            cover.bottomAnchor.constraint(equalTo: view.bottomAnchor)
        ])

        // Kevin's background runs full bleed behind the status bar: full width, 60 pt above the top edge, so its empty
        // ceiling sits under the badge and the floor gives way at the bottom.
        let art = UIImageView(image: UIImage(named: "LoadingArt"))
        art.contentMode = .scaleAspectFill
        art.translatesAutoresizingMaskIntoConstraints = false
        art.isAccessibilityElement = false
        cover.addSubview(art)

        // The bar sits over a scrim that deepens toward the bottom edge.
        let band = UIImageView(image: UIImage(named: "LoadScrim"))
        band.contentMode = .scaleToFill
        band.translatesAutoresizingMaskIntoConstraints = false
        cover.addSubview(band)

        NSLayoutConstraint.activate([
            art.topAnchor.constraint(equalTo: cover.topAnchor, constant: -60),
            art.centerXAnchor.constraint(equalTo: cover.centerXAnchor),
            art.widthAnchor.constraint(equalTo: cover.widthAnchor),
            art.heightAnchor.constraint(equalTo: art.widthAnchor, multiplier: 2098.0 / 750.0),
            band.leadingAnchor.constraint(equalTo: cover.leadingAnchor),
            band.trailingAnchor.constraint(equalTo: cover.trailingAnchor),
            band.bottomAnchor.constraint(equalTo: cover.bottomAnchor),
            band.topAnchor.constraint(equalTo: cover.safeAreaLayoutGuide.bottomAnchor, constant: -220)
        ])

        // The badge drops in with a springy pop once the cover is up, then floats gently while the game loads.
        let badge = UIImageView(image: UIImage(named: "LoadBadge"))
        badge.contentMode = .scaleAspectFit
        badge.translatesAutoresizingMaskIntoConstraints = false
        badge.isAccessibilityElement = false
        badge.layer.shadowColor = UIColor.black.cgColor
        badge.layer.shadowOpacity = 0.35
        badge.layer.shadowRadius = 9
        badge.layer.shadowOffset = CGSize(width: 0, height: 10)
        cover.addSubview(badge)
        let badgeWide = badge.widthAnchor.constraint(equalTo: cover.widthAnchor, multiplier: 0.74)
        badgeWide.priority = .defaultHigh
        NSLayoutConstraint.activate([
            badge.topAnchor.constraint(equalTo: cover.safeAreaLayoutGuide.topAnchor, constant: 8),
            badge.centerXAnchor.constraint(equalTo: cover.centerXAnchor),
            badge.widthAnchor.constraint(lessThanOrEqualToConstant: 340),
            badgeWide,
            badge.heightAnchor.constraint(equalTo: badge.widthAnchor, multiplier: 649.0 / 720.0)
        ])
        dropInBadge(badge)

        let bar = makeLoadBar(in: band)
        let label = UILabel()
        label.text = "Growing your empire\u{2026}"
        let base = UIFont.systemFont(ofSize: 19, weight: .bold)
        label.font = base.fontDescriptor.withDesign(.rounded).map { UIFont(descriptor: $0, size: 19) } ?? base
        label.textColor = UIColor(red: 246/255, green: 236/255, blue: 201/255, alpha: 1)
        label.layer.shadowColor = UIColor.black.cgColor
        label.layer.shadowOpacity = 0.5
        label.layer.shadowRadius = 3
        label.layer.shadowOffset = CGSize(width: 0, height: 2)
        label.translatesAutoresizingMaskIntoConstraints = false
        label.isAccessibilityElement = false
        label.alpha = 0
        band.addSubview(label)
        NSLayoutConstraint.activate([
            label.centerXAnchor.constraint(equalTo: band.centerXAnchor),
            label.topAnchor.constraint(equalTo: bar.bottomAnchor, constant: 16)
        ])
        UIView.animate(withDuration: 0.4, delay: 0.15, options: .curveEaseOut) { label.alpha = 1 }

        // The first quarter of the bar is the page itself arriving; the game reports the rest as the map loads.
        pageProgress = webView?.observe(\.estimatedProgress, options: [.new]) { [weak self] web, _ in
            let fraction = CGFloat(web.estimatedProgress)
            DispatchQueue.main.async { self?.setLoadProgress(0.25 * fraction) }
        }
        armStallTimer(after: 8)
    }

    /// Springs the badge in from slightly above and small, then sets it floating 5 pt up and down. Reduce Motion fades it in.
    private func dropInBadge(_ badge: UIView) {
        badge.alpha = 0
        if UIAccessibility.isReduceMotionEnabled {
            UIView.animate(withDuration: 0.4, delay: 0.15, options: .curveEaseOut) { badge.alpha = 1 }
            return
        }
        badge.transform = CGAffineTransform(translationX: 0, y: -28).scaledBy(x: 0.62, y: 0.62)
        UIView.animate(withDuration: 0.9, delay: 0.15, usingSpringWithDamping: 0.55, initialSpringVelocity: 0.6,
                       options: [.curveEaseOut]) {
            badge.alpha = 1
            badge.transform = .identity
        } completion: { _ in
            let float = CABasicAnimation(keyPath: "transform.translation.y")
            float.fromValue = 0
            float.toValue = -5
            float.duration = 1.6
            float.autoreverses = true
            float.repeatCount = .infinity
            float.timingFunction = CAMediaTimingFunction(name: .easeInEaseOut)
            badge.layer.add(float, forKey: "badgeFloat")
        }
    }

    /// The track is a sliced image (the launch storyboard shows it too, empty). The fill is a glowing lime capsule 4 pt
    /// inside it, with a soft halo view behind it.
    private func makeLoadBar(in band: UIView) -> UIView {
        let track = UIImageView(image: UIImage(named: "LoadTrack"))
        track.translatesAutoresizingMaskIntoConstraints = false
        track.isAccessibilityElement = true
        track.accessibilityLabel = "Loading Canopy"
        track.accessibilityTraits = [.updatesFrequently]
        track.accessibilityValue = "0 percent"
        band.addSubview(track)

        let lime = UIColor(red: 168/255, green: 240/255, blue: 74/255, alpha: 1)
        let halo = UIView()
        halo.translatesAutoresizingMaskIntoConstraints = false
        halo.backgroundColor = lime
        halo.layer.cornerRadius = 7
        halo.layer.shadowColor = lime.cgColor
        halo.layer.shadowOpacity = 0.85
        halo.layer.shadowRadius = 7
        halo.layer.shadowOffset = .zero
        halo.alpha = 0
        track.addSubview(halo)
        let fill = LoadFillView()
        fill.translatesAutoresizingMaskIntoConstraints = false
        fill.alpha = 0
        track.addSubview(fill)

        let wide = track.widthAnchor.constraint(equalTo: band.widthAnchor, constant: -56)
        wide.priority = .defaultHigh
        let fillWidth = fill.widthAnchor.constraint(equalToConstant: 14)
        NSLayoutConstraint.activate([
            track.bottomAnchor.constraint(equalTo: (band.superview ?? band).safeAreaLayoutGuide.bottomAnchor, constant: -61),
            track.centerXAnchor.constraint(equalTo: band.centerXAnchor),
            track.heightAnchor.constraint(equalToConstant: 22),
            track.widthAnchor.constraint(lessThanOrEqualToConstant: 400),
            wide,
            fill.leadingAnchor.constraint(equalTo: track.leadingAnchor, constant: 4),
            fill.topAnchor.constraint(equalTo: track.topAnchor, constant: 4),
            fill.bottomAnchor.constraint(equalTo: track.bottomAnchor, constant: -4),
            fillWidth,
            halo.leadingAnchor.constraint(equalTo: fill.leadingAnchor),
            halo.trailingAnchor.constraint(equalTo: fill.trailingAnchor),
            halo.topAnchor.constraint(equalTo: fill.topAnchor),
            halo.bottomAnchor.constraint(equalTo: fill.bottomAnchor)
        ])
        loadBar = track
        loadFillWidth = fillWidth
        return track
    }

    /// Moves the bar forward, never back: the game's file count grows as it discovers more to load, which would
    /// otherwise make the bar slip.
    private func setLoadProgress(_ value: CGFloat, completion: (() -> Void)? = nil) {
        guard let cover = loadingCover, let bar = loadBar else { completion?(); return }
        let target = min(max(value, 0), 1)
        guard target > loadShown else { completion?(); return }
        loadShown = target
        bar.accessibilityValue = "\(Int((target * 100).rounded())) percent"
        cover.layoutIfNeeded()
        let run = max(bar.bounds.width - 8, 0) * target
        loadFillWidth?.constant = max(14, run)
        bar.subviews.forEach { $0.alpha = 1 }
        let update = { cover.layoutIfNeeded() }
        if UIAccessibility.isReduceMotionEnabled {
            update(); completion?(); return
        }
        // The last stretch is quick so the reveal does not keep the shop's own build waiting.
        UIView.animate(withDuration: target >= 1 ? 0.2 : 0.35, delay: 0, options: [.curveEaseOut, .beginFromCurrentState],
                       animations: update) { _ in completion?() }
    }

    private func armStallTimer(after seconds: Double) {
        stallTimer?.cancel()
        let lift = DispatchWorkItem { [weak self] in self?.dismissLoadingCover() }
        stallTimer = lift
        DispatchQueue.main.asyncAfter(deadline: .now() + seconds, execute: lift)
    }

    private func dismissLoadingCover() {
        guard let cover = loadingCover else { return }
        loadingCover = nil
        stallTimer?.cancel()
        pageProgress = nil
        if UIAccessibility.isReduceMotionEnabled {
            UIView.animate(withDuration: 0.3, animations: { cover.alpha = 0 }) { _ in cover.removeFromSuperview() }
        } else {
            // A smoky reveal: puffs billow over the whole screen, the art, badge and bar drift up into them, and the forest
            // thins away underneath, so the map (building itself at the same moment) appears out of the smoke.
            puffSmoke(over: cover)
            UIView.animate(withDuration: 0.35, delay: 0, options: .curveEaseIn) {
                cover.subviews.forEach {
                    $0.alpha = 0
                    $0.transform = CGAffineTransform(translationX: 0, y: -12).scaledBy(x: 1.06, y: 1.06)
                }
            }
            UIView.animate(withDuration: 0.8, delay: 0.15, options: .curveEaseInOut,
                           animations: { cover.alpha = 0 }) { _ in cover.removeFromSuperview() }
        }
        // The cover was modal; hand VoiceOver back to the game.
        UIAccessibility.post(notification: .screenChanged, argument: webView)
    }

    /// One short burst of soft cream puffs across the screen: about 60 large, faint ones that overlap into one cloud,
    /// swell, rise and thin out over about 1.6 s. The layer then removes itself, so the map's first frames are not
    /// held up.
    private func puffSmoke(over cover: UIView) {
        guard let host = cover.superview, let puff = UIImage(named: "SmokePuff")?.cgImage else { return }
        let bounds = cover.frame
        let smoke = CAEmitterLayer()
        smoke.frame = bounds
        smoke.emitterShape = .rectangle
        smoke.emitterMode = .surface
        smoke.emitterPosition = CGPoint(x: bounds.midX - bounds.minX, y: bounds.midY - bounds.minY)
        smoke.emitterSize = CGSize(width: bounds.width * 1.1, height: bounds.height * 1.1)
        smoke.beginTime = CACurrentMediaTime()
        smoke.seed = UInt32.random(in: 0...UInt32.max)

        let cell = CAEmitterCell()
        cell.contents = puff
        cell.birthRate = 500
        cell.lifetime = 1.6
        cell.lifetimeRange = 0.4
        cell.scale = 1.8
        cell.scaleRange = 0.6
        cell.scaleSpeed = 0.5
        cell.velocity = 40
        cell.velocityRange = 30
        cell.emissionRange = .pi * 2
        cell.yAcceleration = -30
        cell.spinRange = 1.2
        cell.color = UIColor(red: 0.90, green: 0.93, blue: 0.84, alpha: 0.5).cgColor
        cell.alphaSpeed = -0.35
        smoke.emitterCells = [cell]

        host.layer.insertSublayer(smoke, above: cover.layer)
        // Emit for a moment only; the puffs already out live on and fade.
        DispatchQueue.main.asyncAfter(deadline: .now() + 0.12) { smoke.birthRate = 0 }
        DispatchQueue.main.asyncAfter(deadline: .now() + 2.4) { smoke.removeFromSuperlayer() }
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
            // four tabs share the width of the screen, and past that the longest of them ("Stations") starts
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

        // The bar fills the width of a phone and stops growing after that. Stretched across an iPad it put a
        // hundred and forty points between neighbouring tabs, which reads as a row of scattered buttons rather
        // than one control — and iPadOS floats its own tab bars centred rather than pinning them to both edges.
        // The fill is what it wants; the cap is what it must obey, so a phone is unchanged and a tablet centres.
        let fill = bar.widthAnchor.constraint(equalTo: view.safeAreaLayoutGuide.widthAnchor, constant: -20)
        fill.priority = .defaultHigh
        centredRules = [
            bar.centerXAnchor.constraint(equalTo: view.safeAreaLayoutGuide.centerXAnchor),
            fill,
            bar.widthAnchor.constraint(lessThanOrEqualToConstant: 560),
            bar.leadingAnchor.constraint(greaterThanOrEqualTo: view.safeAreaLayoutGuide.leadingAnchor, constant: 10)
        ]
        NSLayoutConstraint.activate(centredRules)

        NSLayoutConstraint.activate([
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
        select(tabs[hit.tag], toggle: false)
    }

    /// Colour carries the selection. The guidance is to tint the label rather than fill the background for a
    /// selected tab, and to keep background colour for a single primary action — which a tab bar does not have.
    private func paint(animated: Bool = false) {
        for (index, tab) in tabs.enumerated() {
            let chosen = tab.key == selectedKey
            buttons[index].tintColor = chosen ? accent : resting
            buttons[index].configuration?.baseForegroundColor = chosen ? accent : resting
            buttons[index].accessibilityLabel = tab.title
            buttons[index].accessibilityHint = chosen && panelExpanded ? "Collapse panel" : "Open panel"
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

    /// Follows the web sheet when it becomes a side panel, and goes back to centred when it does not. The values
    /// are CSS pixels, which are points here because the web view is not zoomed.
    private func setAnchor(left: Double?, width: Double?) {
        guard let bar = tabBar else { return }
        guard let left, let width, width > 120 else {
            guard anchorLeading != nil else { return }
            anchorLeading?.isActive = false; anchorWidth?.isActive = false
            anchorLeading = nil; anchorWidth = nil
            NSLayoutConstraint.activate(centredRules)
            return
        }
        if anchorLeading == nil {
            NSLayoutConstraint.deactivate(centredRules)
            let lead = bar.leadingAnchor.constraint(equalTo: view.leadingAnchor, constant: left)
            let wide = bar.widthAnchor.constraint(equalToConstant: width)
            anchorLeading = lead; anchorWidth = wide
            NSLayoutConstraint.activate([lead, wide])
        } else {
            anchorLeading?.constant = left
            anchorWidth?.constant = width
        }
    }

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
    private func select(_ tab: Tab, toggle: Bool = true) {
        // Taps toggle the current panel; scrubbing only changes tabs, so lingering on one cannot
        // repeatedly collapse and reopen it.
        guard toggle || tab.key != selectedKey else { return }
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
        if message.name == "canopyMap" {
            guard let nativeMap else { return }
            if let width = payload["width"] as? Double, let height = payload["height"] as? Double {
                let frame = CGRect(x: payload["left"] as? Double ?? 0, y: payload["top"] as? Double ?? 0, width: width, height: height)
                if nativeMap.mapView.frame != frame { nativeMap.mapView.frame = frame }
            }
            let id = payload["id"] as? Int ?? 0
            nativeMap.receive(payload) { [weak self] result in
                switch result {
                case .drawn:
                    self?.webView?.evaluateJavaScript("window.canopyNativeMapAck&&window.canopyNativeMapAck(\(id))")
                case .retry:
                    // Busy or backgrounded: drop this frame, the web side sends the next one.
                    self?.webView?.evaluateJavaScript("window.canopyNativeMapRetry&&window.canopyNativeMapRetry()")
                case .failed:
                    self?.webView?.evaluateJavaScript("window.canopyNativeMapFailed&&window.canopyNativeMapFailed()")
                    self?.nativeMap?.mapView.isHidden = true
                }
            }
            return
        }
        #if DEBUG
        if message.name == "canopyMapReview" {
            if let data = try? JSONSerialization.data(withJSONObject: payload, options: [.prettyPrinted, .sortedKeys]) {
                let url = FileManager.default.urls(for: .documentDirectory, in: .userDomainMask)[0].appendingPathComponent("native-map-review.json")
                try? data.write(to: url, options: .atomic)
            }
            return
        }
        #endif
        guard message.name == "canopyTray" else { return }
        if let load = payload["load"] as? Double {
            // The map's files, 0 to 1, after the page's quarter. Any word from the game resets the stall timer.
            setLoadProgress(0.25 + 0.7 * CGFloat(load))
            armStallTimer(after: 6)
        }
        if payload["ready"] as? Bool == true {
            // Fill the bar, then lift the cover as the shop starts building itself.
            setLoadProgress(1) { [weak self] in self?.dismissLoadingCover() }
        }
        if !powerStatePushed { pushPowerState() }
        if let expanded = payload["expanded"] as? Bool { panelExpanded = expanded }
        if let active = payload["active"] as? String, tabs.contains(where: { $0.key == active }) {
            selectedKey = active
            paint(animated: true)
        }
        if let hidden = payload["hidden"] as? Bool {
            setBarHidden(hidden)
        }
        setAnchor(left: payload["anchorLeft"] as? Double, width: payload["anchorWidth"] as? Double)
        if let badges = payload["badges"] as? [String] {
            for (index, tab) in tabs.enumerated() {
                badgeDots[index].isHidden = !badges.contains(tab.key)
                buttons[index].accessibilityValue = badges.contains(tab.key) ? "Update available" : nil
            }
        }
    }
}

/// The loading bar's fill: brightens toward its leading end, keeps a glossy top edge, and has a highlight sweeping across
/// it on a loop (the web's .load-fill matches). The sweep moves the gradient's stops, so it keeps pace as the fill grows.
private final class LoadFillView: UIView {
    private let base = CAGradientLayer()
    private let gloss = CAGradientLayer()
    private let shimmer = CAGradientLayer()

    override init(frame: CGRect) {
        super.init(frame: frame)
        layer.cornerRadius = 7
        layer.masksToBounds = true
        base.startPoint = CGPoint(x: 0, y: 0.5)
        base.endPoint = CGPoint(x: 1, y: 0.5)
        base.colors = [UIColor(red: 79/255, green: 158/255, blue: 18/255, alpha: 1).cgColor,
                       UIColor(red: 143/255, green: 220/255, blue: 42/255, alpha: 1).cgColor,
                       UIColor(red: 214/255, green: 255/255, blue: 134/255, alpha: 1).cgColor]
        base.locations = [0, 0.65, 1]
        gloss.colors = [UIColor(white: 1, alpha: 0.35).cgColor, UIColor(white: 1, alpha: 0).cgColor,
                        UIColor(white: 0, alpha: 0).cgColor, UIColor(white: 0, alpha: 0.12).cgColor]
        gloss.locations = [0, 0.3, 0.8, 1]
        shimmer.startPoint = CGPoint(x: 0, y: 0.5)
        shimmer.endPoint = CGPoint(x: 1, y: 0.5)
        shimmer.colors = [UIColor(white: 1, alpha: 0).cgColor, UIColor(white: 1, alpha: 0.6).cgColor,
                          UIColor(white: 1, alpha: 0).cgColor]
        shimmer.locations = [-0.45, -0.225, 0]
        [base, gloss, shimmer].forEach { layer.addSublayer($0) }
        if !UIAccessibility.isReduceMotionEnabled {
            let sweep = CABasicAnimation(keyPath: "locations")
            sweep.fromValue = [-0.45, -0.225, 0]
            sweep.toValue = [1, 1.225, 1.45]
            sweep.duration = 1.6
            sweep.repeatCount = .infinity
            sweep.timingFunction = CAMediaTimingFunction(name: .easeInEaseOut)
            shimmer.add(sweep, forKey: "sweep")
        }
    }

    required init?(coder: NSCoder) { nil }

    override func layoutSubviews() {
        super.layoutSubviews()
        CATransaction.begin()
        CATransaction.setDisableActions(true)
        [base, gloss, shimmer].forEach { $0.frame = bounds }
        CATransaction.commit()
    }
}
