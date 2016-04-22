import { GET_CHALLENGES } from './../actions/challenges';


const reducer = (state = [], action) => {
    switch (action.type) {
    case GET_CHALLENGES:
        return [
            ...state,
            ...action.challenges
        ];
    default:
        return state;
    }
};

export default reducer;
