const reducer = (state = [], action = {}) => {
    switch (action.type) {
    case 'GET_INITIAL_CHALLENGES':
        return [
            ...state,
            ...action.challenges
        ];
    default:
        return state;
    }
};

export default reducer;
