import React from 'react';
import { connect } from 'react-redux';
import Challenge from '../Challenges/Challenge';

let WatchList = ({ challenges, dispatch }) => {
    if (!challenges.length) {
        dispatch(getInitialChallenges());
    }
    return (
        <ul className="challenges__challengeList">
            { challenges.map((challenge, index) => (
                <Challenge key={ index } challenge={ challenge } />
            ))}
        </ul>
    );
};

WatchList.propTypes = {
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
        fetch('http://localhost:9000/api/users/5714fd19c4cb759116832844/challenges')
            .then(response => response.json())
            .then(challenges => {
                dispatch({
                    type: 'WATCH_LIST_CHALLENGES_RECEIVED',
                    challenges
                })
            });
    };
}

WatchList = connect(mapStateToProps)(WatchList);

export default WatchList;
