import { GET_CHALLENGE, PASS_CHALLENGE } from './../actions/challenge';

const reducer = (state = {}, action = {}) => {
    switch (action.type) {
        case GET_CHALLENGE:
            //console.log(action.challenge,'get');
            return action.challenge;
        case PASS_CHALLENGE:
            //console.log(action.challenge,'pass');
            return action.challenge;
        default:
            //const challenge = {image:'', title:'', level:'', description:'', user:{}};
            //return Object.assign({}, state, challenge);
            return state;
    }
};

export default reducer;
