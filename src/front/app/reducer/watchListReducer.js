const reducer = (state = [], action = {}) => {
    switch (action.type) {
        case 'WATCH_LIST_CHALLENGES_RECEIVED':
            return [ ...action.challenges ];
        default:
            return state;
    }
};

export default reducer;
