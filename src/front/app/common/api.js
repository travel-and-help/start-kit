export default function api(url, options) {
    return fetch(addBaseApiUrl(url), options);
}

function addBaseApiUrl(url) {
    return process.env.API_BASE_URL + url;
}
