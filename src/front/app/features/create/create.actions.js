import { hashHistory } from 'react-router';
import api from '../../common/api';

export const GET_CATEGORIES = 'GET_CATEGORIES';
export const POST_CHALLENGE = 'POST_CHALLENGE';

function receiveCategories(categories) {
    return {
        type: GET_CATEGORIES,
        categories
    };
}

function receiveChallenge(challenge) {
    return {
        type: POST_CHALLENGE,
        challenge
    };
}

export function fetchCategories() {
    return function innerFetchCategories(dispatch) {
        api('/api/categories')
            .then((categories) => {
                dispatch(receiveCategories(categories));
            });
    };
}

export function postChallenge(formData) {
    return function innerPostChallenge(dispatch) {
        const baseUrl = 'http://ec2-52-35-85-119.us-west-2.compute.amazonaws.com:8080/';
        const hostingRequest = {
            file: formData.image
        };
        const headers = new Headers({
            'Content-Type': 'multipart/form-data'
        });
        fetch(`${baseUrl}picture`, {
            method: 'POST',
            headers,
            body: JSON.stringify(hostingRequest) })
            .then(response => response.json())
            .then(response => `${baseUrl}${response.path}`)
            .then(image => {
                api('/api/challenges/', {
                    method: 'POST',
                    body: JSON.stringify({ ...formData, image }) })
                    .then((response) => {
                        dispatch(receiveChallenge(response));
                        hashHistory.goBack();
                    });
            });
    };
}

