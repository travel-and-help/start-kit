import { get as getFromLocalStorage } from './local-storage';
import { hashHistory } from 'react-router';

export default function api(url, options = {}) {
    const token = getFromLocalStorage('token');
    if (token) {
        Object.assign(options, {
            credentials: 'include',
            headers: { Authorization: `Bearer ${token}` }
        });
    }
    return fetch(addBaseApiUrl(url), options)
        .then(checkHttpStatus)
        .then((response) => response.json())
        .catch(error => {
            const LOGIN_SCREEN_ROUTE = '/';
            if (error.response.status === 401) {
                hashHistory.push(LOGIN_SCREEN_ROUTE);
            } else {
                throw error;
            }
        });
}

function addBaseApiUrl(url) {
    return process.env.API_BASE_URL + url;
}

function checkHttpStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
}
