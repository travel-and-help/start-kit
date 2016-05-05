import { GET_USER } from './../actions/user';

const reducer = (state = {}, action) => {
    switch (action.type) {
        case GET_USER:
            return Object.assign({}, state,  action.user);
        default:
            return state;
    }
};

export default reducer;
