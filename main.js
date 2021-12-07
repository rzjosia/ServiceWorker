if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/service-worker.js")
    .then(() => {
        console.log("[main] Service worker registered");
    })
    .catch(() => {
        console.error("[main] Service worker registration failed");
    })

    navigator.serviceWorker.addEventListener('controllerchange', () => {
        console.log("{main] Service worker updated, reloading");
        window.location.reload();
    })
} else {
    console.error("[main] Service worker no exists in this browser");
}