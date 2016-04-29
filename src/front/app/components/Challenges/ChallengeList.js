import React from 'react';
import { connect } from 'react-redux';
import { fetchChallenges } from './../../actions/challenges';
import Challenge from './Challenge';
import TopChallenge from './TopChallenge';

class ChallengeList extends React.Component {
    constructor(props) {
        super(props);
        const { challenges, dispatch } = props;
        if (!challenges.length) {
            dispatch(fetchChallenges());
        }
    }

    render() {
        const { challenges, dispatch } = this.props,
            topChallenge = challenges[0],
            otherChallenges = challenges.slice(1);

        //console.log(dispatch);

        return (
            <ul className="challenges__list">
            { topChallenge && <TopChallenge challenge={topChallenge} dispatch={dispatch} /> }
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

export default connect(mapStateToProps)(ChallengeList);
