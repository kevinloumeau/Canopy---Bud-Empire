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
final class CanopyViewController: CAPBridgeViewController, WKScriptMessageHandler {

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

    /// The shop's own palette, so the selected tab reads as Canopy rather than as system blue.
    private let accent = UIColor(red: 0.71, green: 0.78, blue: 0.52, alpha: 1)      // #b6c885
    private let resting = UIColor(red: 0.86, green: 0.90, blue: 0.84, alpha: 0.92)

    private var buttons: [UIButton] = []
    private var badgeDots: [UIView] = []
    private var selectedKey = "factory"

    override func viewDidLoad() {
        super.viewDidLoad()
        webView?.configuration.userContentController.add(self, name: "canopyTray")
        installTabBar()
    }

    // MARK: - The bar

    private func installTabBar() {
        let effect: UIVisualEffect
        if #available(iOS 26.0, *) {
            // Regular rather than clear: the tabs carry labels, and regular is the variant that adjusts
            // luminosity behind text to keep it legible over whatever the shop happens to be showing.
            effect = UIGlassEffect(style: .regular)
        } else {
            effect = UIBlurEffect(style: .systemThinMaterialDark)
        }

        let bar = UIVisualEffectView(effect: effect)
        bar.translatesAutoresizingMaskIntoConstraints = false
        bar.layer.cornerRadius = 30
        bar.layer.cornerCurve = .continuous
        bar.clipsToBounds = true
        // Left to adapt, the glass reads light over the shop and the labels on it end up light-on-light, which
        // fails contrast. The game is dark in both system appearances, so the bar is pinned dark and the labels
        // can stay light — the monochromatic pairing the material guidance asks for, just decided rather than
        // inferred.
        bar.overrideUserInterfaceStyle = .dark
        view.addSubview(bar)

        let row = UIStackView()
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
            config.titleTextAttributesTransformer = UIConfigurationTextAttributesTransformer { attrs in
                var out = attrs
                out.font = .systemFont(ofSize: 11, weight: .semibold)
                return out
            }
            button.configuration = config
            button.tag = index
            button.addTarget(self, action: #selector(tabTapped(_:)), for: .touchUpInside)
            // A tab is a destination, not a verb, so it reads as a tab to VoiceOver rather than as a button.
            button.accessibilityTraits = [.button]
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

        paint()
    }

    /// Colour carries the selection. The guidance is to tint the label rather than fill the background for a
    /// selected tab, and to keep background colour for a single primary action — which a tab bar does not have.
    private func paint() {
        for (index, tab) in tabs.enumerated() {
            let chosen = tab.key == selectedKey
            buttons[index].tintColor = chosen ? accent : resting
            buttons[index].configuration?.baseForegroundColor = chosen ? accent : resting
            buttons[index].accessibilityLabel = tab.title
            buttons[index].accessibilityValue = chosen ? "Selected" : nil
        }
    }

    // MARK: - Native to web

    @objc private func tabTapped(_ sender: UIButton) {
        let tab = tabs[sender.tag]
        selectedKey = tab.key
        paint()
        let escaped = tab.key.replacingOccurrences(of: "'", with: "")
        webView?.evaluateJavaScript("window.canopyNativeTray&&window.canopyNativeTray.select('\(escaped)')")
    }

    // MARK: - Web to native

    func userContentController(_ controller: WKUserContentController, didReceive message: WKScriptMessage) {
        guard message.name == "canopyTray", let payload = message.body as? [String: Any] else { return }
        if let active = payload["active"] as? String, tabs.contains(where: { $0.key == active }) {
            selectedKey = active
            paint()
        }
        if let badges = payload["badges"] as? [String] {
            for (index, tab) in tabs.enumerated() {
                badgeDots[index].isHidden = !badges.contains(tab.key)
            }
        }
    }
}
