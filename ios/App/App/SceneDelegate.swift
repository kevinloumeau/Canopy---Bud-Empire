import UIKit
import Capacitor

class SceneDelegate: UIResponder, UIWindowSceneDelegate {
    var window: UIWindow?

    func scene(_ scene: UIScene, willConnectTo session: UISceneSession, options connectionOptions: UIScene.ConnectionOptions) {
        guard let windowScene = scene as? UIWindowScene else { return }

        window = UIWindow(windowScene: windowScene)
        // The root controller is built here rather than loaded from Main.storyboard, so this is the line that
        // decides the class — CanopyViewController adds the native Liquid Glass tab bar over the web view.
        window?.rootViewController = CanopyViewController()
        window?.makeKeyAndVisible()

        SceneDelegateProxy.shared.scene(scene, willConnectTo: session, options: connectionOptions)
    }

    // Scene activation also covers interruptions that do not hide the web document.
    // The web side combines this signal with visibilitychange and settles each absence once.
    func sceneWillResignActive(_ scene: UIScene) {
        sendActivity(false)
    }

    func sceneDidBecomeActive(_ scene: UIScene) {
        sendActivity(true)
    }

    private func sendActivity(_ active: Bool) {
        guard let controller = window?.rootViewController as? CanopyViewController else { return }
        controller.webView?.evaluateJavaScript(
            "window.dispatchEvent(new CustomEvent('canopyAppState',{detail:\(active)}))",
            completionHandler: nil)
    }

    func scene(_ scene: UIScene, openURLContexts URLContexts: Set<UIOpenURLContext>) {
        SceneDelegateProxy.shared.scene(scene, openURLContexts: URLContexts)
    }

    func scene(_ scene: UIScene, continue userActivity: NSUserActivity) {
        SceneDelegateProxy.shared.scene(scene, continue: userActivity)
    }
}
