import React, { PropTypes } from 'react';
import TopChallengeTile from './TopChallengeTile';
import ChallengeTileList from './ChallengeTileList';
import ImmutablePropTypes from 'react-immutable-proptypes';

class ChallengeScreen extends React.Component {
    componentDidMount() {
        this.props.getChallenges();
    }

    render() {
        const { challenges } = this.props;
        const topChallenge = challenges.first(),
            otherChallenges = challenges.slice(1);

        return (
            <div>
                { topChallenge && <TopChallengeTile challenge={ topChallenge } /> }
                <ChallengeTileList challenges={otherChallenges} />
            </div>
        );
    }

}

ChallengeScreen.propTypes = {
    challenges: ImmutablePropTypes.list.isRequired,
    getChallenges: PropTypes.func.isRequired
};

export default ChallengeScreen;
