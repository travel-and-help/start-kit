
export default class CordovaBrowserWrapper {

    constructor(url, target, config) {
        this.browserWindow = window.cordova.InAppBrowser.open(url, target, config);
    }

    getGetWindow() {
        return this.browserWindow;
    }

    close() {
        this.browserWindow.close();
    }

    getUrl() {
        return new Promise((resolve) => {
            this.getGetWindow().executeScript(
                { code: 'document.URL' },
                (url) => {
                    resolve(url.toString());
                });
        });
    }

    getBody() {
        return new Promise((resolve) => {
            this.getGetWindow().executeScript(
                { code: 'document.body.innerHTML' },
                (body) => {
                    resolve(body.toString());
                });
        });
    }

    waitUrl(serviceCallbackUrl) {
        const browserWindow = this.getGetWindow();
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
