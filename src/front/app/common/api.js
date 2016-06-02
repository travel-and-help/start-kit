import { get as getFromLocalStorage } from './local-storage';
import { hashHistory } from 'react-router';

export default function api(url, options = {}) {
    const token = getFromLocalStorage('token');
    const settings = Object.assign({ headers: {} }, options);

    if (token) {
        settings.credentials = 'include';
        settings.headers.Authorization = `Bearer ${token}`;
    }

    settings.headers.Accept = 'application/json';
    settings.headers['Content-Type'] = 'application/json';

    return fetch(addBaseApiUrl(url), settings)
        .then(checkHttpStatus)
        .then((response) => response.json())
        .catch(error => {
            if (error.response.status === 401) {
                hashHistory.push('login');
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
