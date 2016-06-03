import { Map, fromJS } from 'immutable';
import { GET_USER } from './profile.actions';

const initialState = new Map();

export default (state = initialState, action) => {
    switch (action.type) {
    case GET_USER:
        return fromJS(action.user);
    default:
        return state;
    }
};
