import React from 'react';
import { connect } from 'react-redux';
import actions from './../../actions/challenges';
import Challenge from './Challenge';
import TopChallenge from './TopChallenge';

class ChallengeList extends React.Component {
    constructor(props) {
        super(props);
        const { challenges, dispatch } = props;
        if (!challenges.length) {
            dispatch(getInitialChallenges());
        }
    }

    render() {
        const { challenges } = this.props,
            topChallenge = challenges[0],
            otherChallenges = challenges.slice(1);

        return (
            <ul className="challenges__list">
                <TopChallenge { ...topChallenge } />
                { otherChallenges.map((challenge, index) => (
                    <Challenge key={ index } { ...challenge } />
                ))}
            </ul>
        );
    }

}

ChallengeList.propTypes = {
    challenges: React.PropTypes.array,
    dispatch: React.PropTypes.func
};

const mapStateToProps = ({ challenges }) => ({ challenges });

function getInitialChallenges() {
    return function fetchChallenges(dispatch) {
        fetch('/api/challenges')
            .then(response => response.json())
            .then((challenges) => {
                dispatch({
                    type: actions.getChallenges,
                    challenges
                });
            });
    };
}

export default connect(mapStateToProps)(ChallengeList);
