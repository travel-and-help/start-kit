import { GET_USER } from './../actions/user';
import {List, Map} from 'immutable';

const init = List({});

export default (user = init, action) => {
    switch (action.type) {
        case GET_USER:
            return Object.assign({}, user, action.user);
        default:
            return user;
    }
};