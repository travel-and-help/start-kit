import { get as getFromLocalStorage } from './local-storage';

export default function api(context) {
    const token = getFromLocalStorage('token');
    const fetchConfig = {};
    if (token) {
        Object.assign(fetchConfig, {
            credentials: 'include',
            headers: { Authorization: `Bearer ${token}` }
        });
    }
    return fetch(requestContext(context), fetchConfig)
        .then(checkHttpStatus)
        .then((response) => {
            return response.json();
        });
}

function requestContext(context) {
    if (typeof context === 'object') {
        if (context.url) {
            return {
                ...context,
                url: addBaseApiUrl(context.url)
            };
        }
    }

    if (typeof context === 'string') {
        return addBaseApiUrl(context);
    }

    return context;
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
