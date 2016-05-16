export default function api(context) {
    return fetch(requestContext(context));
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
