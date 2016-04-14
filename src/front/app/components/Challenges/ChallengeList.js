import React from 'react';
import { connect } from 'react-redux';
import Challenge from './Challenge';
import TopChallenge from './TopChallenge';

let ChallengeList = ({challenges, getInitialChallenges}) => {
    if(!challenges.length) {
        getInitialChallenges();
    }
    const first = challenges[0];
    const others = challenges.slice(1);

    return (
        <ul className="challenges__challengeList">
            < TopChallenge challenge={first}/>
            {others.map((challenge, index) => {
                return (
                    < Challenge key={index} challenge={challenge}/>
                );
            })}
        </ul>
    );
};

const mapStateToProps = (state) => {
    return {
        challenges: state.challenges
    };
};


const mapDispatchToProps = (dispatch) => {
    return {
        getInitialChallenges: () => {
            dispatch({type:'GET_INITIAL_CHALLENGES'})
        }
    };
};

ChallengeList = connect(
    mapStateToProps,
    mapDispatchToProps
)(ChallengeList);

export default ChallengeList;
