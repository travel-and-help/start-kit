export const GET_CHALLENGE_TOPICS = 'GET_CHALLENGE_TOPICS';
export const TOGGLE_CHALLENGE_TOPIC = 'TOGGLE_CHALLENGE_TOPIC';

export function getChallengeTopics() {
    return function fetchChallengeTopics(dispatch) {
        fetch('/api/challengeTopics')
            .then(response => response.json())
            .then((challengeTopics) => {
                dispatch({
                    type: GET_CHALLENGE_TOPICS,
                    challengeTopics
                });
            });
    };
}

export function toggleChallengeTopic(name) {
    // TODO: implement toggle topic functionality
    return {
        type: TOGGLE_CHALLENGE_TOPIC,
        name
    };
}
