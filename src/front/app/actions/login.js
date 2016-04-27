import { LOGIN_ATTEMPT, LOGOUT, LOGIN_SUCCESS, LOGIN_FAILED } from '../constants/login';
import { LOGIN_SERVICES } from '../constants/login';

export function loginAttempt(service) {
    return {
        type: LOGIN_ATTEMPT,
        service
    };
}

export function logout() {
    localStorage.removeItem('token');
    return {
        type: LOGOUT
    };
}

export function loginSuccess(token) {
    localStorage.setItem('token', token);
    return {
        type: LOGIN_SUCCESS,
        token
    };
}

export function loginFailed(info) {
    localStorage.removeItem('token');
    return {
        type: LOGIN_FAILED,
        info
    };
}

class BaseLoginWindow {
    getUrl() {
        throw new Error('Not implemented');
    }
}

class CordovaWindow extends BaseLoginWindow {

    constructor(url, target, config) {
        super();
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
                (url) => {
                    resolve(url.toString());
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

class BrowserLoginWindow extends BaseLoginWindow {

    constructor(url, target, config) {
        super();
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
                    reject(new Error('Window is closed'));
                    stopChecking();
                    return;
                }
                if (url.startsWith(serviceCallbackUrl)) {
                    resolve();
                    stopChecking();
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

function createLoginWindow(serviceURL) {
    return (window.cordova && window.cordova.InAppBrowser)
        ? new CordovaWindow(serviceURL, '_blank', 'closebuttoncaption=Done,location=no')
        : new BrowserLoginWindow(serviceURL, '', 'resizeable=true,height=200,width=200');
}

function getServiceUrl(type) {
    const baseUrl = 'https://travelandhelp.localtunnel.me/';
    switch (type) {
        case LOGIN_SERVICES.FACEBOOK:
            return `${baseUrl}auth/facebook`;
        case LOGIN_SERVICES.GOOGLE_PLUS:
            return `${baseUrl}auth/google-plus`;
        default:
            throw new Error('Login service is not supported');
    }
}

export function login(loginService) {
    return (dispatch) => {
        dispatch(loginAttempt(loginService));
        const serviceURL = getServiceUrl(loginService);
        const serviceCallbackUrl = `${serviceURL}/callback`;
        const loginWindow = createLoginWindow(serviceURL);
        loginWindow
            .waitUrl(serviceCallbackUrl)
            .then(loginWindow.getBody.bind(loginWindow))
            .then((response) => {
                loginWindow.close();
                return response;
            })
            .then((response) => {
                const responseJson = JSON.parse(
                    response.toString().replace(/(<([^>]+)>)/ig, '')
                );
                if (responseJson.success && responseJson.token) {
                    return Promise.resolve(responseJson.token);
                }
                return Promise.reject(response);
            })
            .then((token) => {
                dispatch(loginSuccess(token));
            })
            .catch((error) => {
                dispatch(loginFailed(error));
            });
    };

}
