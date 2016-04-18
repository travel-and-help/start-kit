import React from 'react';
import { connect } from 'react-redux';
import Challenge from './Challenge';
import TopChallenge from './TopChallenge';

let ChallengeList = ({ challenges, dispatch }) => {
    if (!challenges.length) {
        dispatch(getInitialChallenges());
    }
    const first = challenges[0];
    const others = challenges.slice(1);

    return (
        <ul className="challenges__challengeList">
            <TopChallenge challenge={ first } />
            { others.map((challenge, index) => (
                    <Challenge key={ index } challenge={ challenge } />
            ))}
        </ul>
    );
};

ChallengeList.propTypes = {
    challenges: React.PropTypes.array,
    dispatch: React.PropTypes.func
};

const mapStateToProps = ({ challenges }) => {
    return {
      challenges
    };
};

function getInitialChallenges() {
    return function fetchChallenges(dispatch) {
        fetch('http://localhost:9000/api/challenges')
            .then(response => response.json())
            .then(challenges => dispatch({
                type: 'GET_INITIAL_CHALLENGES',
                challenges
            }));
    };
}

ChallengeList = connect(
    mapStateToProps
)(ChallengeList);

export default ChallengeList;
