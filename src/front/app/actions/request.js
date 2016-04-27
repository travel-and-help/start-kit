import { SERVICE_REQUEST_STATUS } from '../constants/common';
import { pushState } from 'redux-router';


export function requested() {
    return {
        type: SERVICE_REQUEST_STATUS.REQUESTED
    };
}

export function receiveSuccess(json) {
    return {
        type: SERVICE_REQUEST_STATUS.RECEIVE_SUCCESS,
        json
    };
}

export function receiveFailed(err) {
    return {
        type: SERVICE_REQUEST_STATUS.RECEIVE_FAILED,
        err
    };
}

export function fetch(url) {
    const token = localStorage.getItem('token');
    return (dispatch) => {
        dispatch(requested());
        const authorizationHeader = {
            credentials: 'include',
            headers: { Authorization: `Bearer ${token}` }
        };
        return fetch(url, authorizationHeader)
            .then(checkHttpStatus)
            .then(parseJSON)
            .then(response => {
                dispatch(receiveSuccess(response.data));
            })
            .catch(error => {
                if (error.response.status === 401) {
                    dispatch(receiveFailed(error));
                    dispatch(pushState(null, '/login'));
                }
            });
    };
}

export function checkHttpStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
}

export function parseJSON(response) {
    return response.json();
}
