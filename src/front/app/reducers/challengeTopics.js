import { GET_CHALLENGE_TOPICS, TOGGLE_CHALLENGE_TOPIC } from './../actions/challengeTopics';

const challengeTopics = (state = [], action) => {
    switch (action.type) {
    case GET_CHALLENGE_TOPICS:
        return action.challengeTopics;
    case TOGGLE_CHALLENGE_TOPIC:
        // TODO: implement toggle topic functionality
        return state;
    default:
        return state;
    }
};

export default challengeTopics;
