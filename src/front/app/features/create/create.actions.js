import { fromJS } from 'immutable';
import { goBack, push } from 'react-router-redux';
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

export function sendChallenge(challenge) {
    return function innerSendChallenge(data) {
        if (challenge && challenge.size) {
            const ignoredFields = ['user', '_id'];
            const immutableData = fromJS(data);
            const formData = immutableData
                .filter((value, key) => ignoredFields.indexOf(key) === -1)
                .filter((value, key) => (challenge.get(key) && (challenge.get(key) !== value)));

            return updateChallenge(formData, challenge.get('_id'));
        }
        const formData = data;
        formData.categories = [data.category];
        formData.location = 'Kyiv';
        formData.level = 'easy';

        return postChallenge(formData);
    };
}

function postChallenge(formData) {
    return function innerPostChallenge(dispatch) {
        api('/api/challenges', {
            method: 'POST',
            body: JSON.stringify(formData)
        })
            .then((response) => {
                dispatch(receiveChallenge(response));
                dispatch(goBack());
            });
    };
}

function updateChallenge(formData, id) {
    return function innerUpdateChallenge(dispatch) {
        if (formData.size) {
            api(`/api/challenges/${id}`, {
                method: 'PUT',
                body: JSON.stringify(formData)
            })
                .then((response) => {
                    dispatch(receiveChallenge(response));
                    dispatch(goBack());
                });
        } else {
            dispatch(push('/main/challenges'));
        }
    };
}
