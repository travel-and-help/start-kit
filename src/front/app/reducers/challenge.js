const reducer = (state = {}, action = {}) => {
    switch (action.type) {
        case 'GET_CHALLENGE':
            return action.challenge;
        default:
            const challenge = {image:'', title:'', level:'', description:'', user:{}};
            return Object.assign({}, state, challenge);
    }
};

export default reducer;
