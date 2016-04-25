const reducer = (state = [], action = {}) => {
    switch (action.type) {
        case 'GET_CHALLENGE':
            return action.challenge;
        default:
            return state;
    }
};

export default reducer;
