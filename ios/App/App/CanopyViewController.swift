import UIKit
import Capacitor
import WebKit

/// Hosts the web game and the native pieces around it: the loading cover, Low Power Mode, and haptics.
///
/// The web page draws the map and every control itself. The native side only covers the launch, tells the page
/// when Low Power Mode is on, and plays haptics when the page asks through the `canopyHaptic` message handler.
final class CanopyViewController: CAPBridgeViewController, WKScriptMessageHandler {

    /// WKWebView does not implement `navigator.vibrate`, so the game posts `{kind}` to `canopyHaptic` instead
    /// (see src/haptics.js). The generators are held rather than built per tap so `prepare()`
    /// has somewhere to warm up; a generator created at the moment of the tap fires late enough to read as a
    /// separate event from the touch rather than as part of it.
    private let selectionHaptic = UISelectionFeedbackGenerator()
    private let lightHaptic = UIImpactFeedbackGenerator(style: .light)
    private let firmHaptic = UIImpactFeedbackGenerator(style: .medium)

    private var loadingCover: UIView?
    /// The loading bar over the scrim at the foot of the art: a glowing lime fill grows inside a cream-rimmed track
    /// its leading end. It only ever moves forward.
    private weak var loadBar: UIView?
    private var loadFillWidth: NSLayoutConstraint?
    private var loadShown: CGFloat = 0
    private var pageProgress: NSKeyValueObservation?
    /// Lifts the cover if loading stalls, so the web loader's own Retry button is never hidden behind it.
    private var stallTimer: DispatchWorkItem?

    override func viewDidLoad() {
        super.viewDidLoad()
        webView?.configuration.userContentController.add(self, name: "canopyTray")
        webView?.configuration.userContentController.add(self, name: "canopyHaptic")
        installLoadingCover()
        NotificationCenter.default.addObserver(
            self, selector: #selector(powerStateChanged),
            name: .NSProcessInfoPowerStateDidChange, object: nil)
    }

    override func capacitorDidLoad() {
        super.capacitorDidLoad()
        // The game pans and zooms itself and its panels scroll inside the page. The web view's own scroll view must
        // stay put: a stray drag or rubber-band would slide the whole game around inside the window.
        if let scroll = webView?.scrollView {
            scroll.isScrollEnabled = false
            scroll.bounces = false
            scroll.alwaysBounceVertical = false
            scroll.alwaysBounceHorizontal = false
            scroll.contentInsetAdjustmentBehavior = .never
            scroll.pinchGestureRecognizer?.isEnabled = false
        }
    }

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

    override func viewDidAppear(_ animated: Bool) {
        super.viewDidAppear(animated)
        selectionHaptic.prepare()
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

    // MARK: - Web to native

    func userContentController(_ controller: WKUserContentController, didReceive message: WKScriptMessage) {
        guard let payload = message.body as? [String: Any] else { return }
        if message.name == "canopyHaptic" {
            playHaptic(payload["kind"] as? String ?? "select")
            return
        }
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
