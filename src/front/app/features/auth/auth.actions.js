import { open } from '../../common/in-app-browser';
import { set, remove } from '../../common/local-storage';
import { hashHistory } from 'react-router';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const LOGIN_ATTEMPT = 'LOGIN_ATTEMPT';
export const LOGIN_SKIPPED = 'LOGIN_SKIPPED';

export const LOGIN_SERVICES = Object.freeze({
    FACEBOOK: 'FACEBOOK',
    GOOGLE_PLUS: 'GOOGLE_PLUS'
});

export function loginAttempt(service) {
    return {
        type: LOGIN_ATTEMPT,
        service
    };
}

export function loginSuccess(token) {
    set('token', token);
    return {
        type: LOGIN_SUCCESS,
        token
    };
}

export function loginFailed(info) {
    remove('token');
    return {
        type: LOGIN_FAILED,
        info
    };
}

export function loginSkipped() {
    return {
        type: LOGIN_SKIPPED
    };
}
function getServiceUrl(type) {
    const baseUrl = process.env.API_BASE_URL;
    switch (type) {
    case LOGIN_SERVICES.FACEBOOK:
        return `${baseUrl}/auth/facebook`;
    case LOGIN_SERVICES.GOOGLE_PLUS:
        return `${baseUrl}/auth/google-plus`;
    default:
        throw new Error('Login service is not supported');
    }
}

function redirect() {
    hashHistory.push('main/challenges');
}

export function login(loginService) {
    return (dispatch) => {
        dispatch(loginAttempt(loginService));
        const serviceURL = getServiceUrl(loginService);
        const serviceCallbackUrl = `${serviceURL}/callback`;
        const loginWindow = open(serviceURL);
        return loginWindow
            .waitUrl(serviceCallbackUrl)
            .then(() => (loginWindow.getBody()))
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
            .then(redirect)
            .catch((error) => {
                dispatch(loginFailed(error));
            });
    };

}

export function skip() {
    return (dispatch) => {
        dispatch(loginSkipped());
        redirect();
    };
}
