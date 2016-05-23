
export default class CordovaBrowserWrapper {

    constructor(url, target, config) {
        this.browserWindow = window.cordova.InAppBrowser.open(url, target, config);
    }

    getWindow() {
        return this.browserWindow;
    }

    close() {
        this.browserWindow.close();
    }

    getUrl() {
        return new Promise((resolve) => {
            this.getWindow().executeScript(
                { code: 'document.URL' },
                (url) => {
                    resolve(url.toString());
                });
        });
    }

    getBody() {
        return new Promise((resolve) => {
            this.getWindow().executeScript(
                { code: 'document.body.innerHTML' },
                (body) => {
                    resolve(body.toString());
                });
        });
    }

    waitUrl(serviceCallbackUrl) {
        const browserWindow = this.getWindow();
        const me = this;
        return new Promise((resolve) => {
            browserWindow.addEventListener('loadstop', function onLoadStop() {
                return me.getUrl()
                    .then((url) => {
                        if (url.startsWith(serviceCallbackUrl)) {
                            browserWindow.removeEventListener('loadstop', onLoadStop);
                            resolve(url);
                        }
                    });
            });

        });
    }
}
