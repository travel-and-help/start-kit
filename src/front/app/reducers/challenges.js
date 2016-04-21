import actions from './../actions/challenges';


const reducer = (state = [], action) => {
    switch (action.type) {
    case actions.getChallenges:
        return [
            ...state,
            ...action.challenges
        ];
    default:
        return state;
    }
};

export default reducer;
