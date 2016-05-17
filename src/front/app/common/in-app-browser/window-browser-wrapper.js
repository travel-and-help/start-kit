
export default class WindowBrowserWrapper {

    constructor(url, target, config) {
        this.browserWindow = window.open(url, target, config);
    }

    getGetWindow() {
        return this.browserWindow;
    }

    close() {
        this.browserWindow.close();
    }

    getBody() {
        const currentWindow = this.getGetWindow();
        return new Promise((resolve) => {
            resolve(currentWindow.document.body.innerText);
        });
    }

    waitUrl(serviceCallbackUrl) {
        const currentWindow = this.getGetWindow();
        return new Promise((resolve, reject) => {
            const intervalId = setInterval(() => {
                const url = currentWindow.location && currentWindow.location.href;
                if (currentWindow.closed) {
                    stopChecking();
                    reject(new Error('Window is closed'));
                    return;
                }
                if (url.startsWith(serviceCallbackUrl)) {
                    stopChecking();
                    resolve(url);
                }
            }, 500);

            function stopChecking() {
                if (intervalId) {
                    clearInterval(intervalId);
                }
            }
        });
    }
}
