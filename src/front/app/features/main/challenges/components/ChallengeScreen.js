import React, { PropTypes } from 'react';
import TopChallengeTile from '../../../../common/components/challenge/TopChallengeTile';
import ChallengeTileList from '../../../../common/components/challenge/ChallengeTileList';
import ImmutablePropTypes from 'react-immutable-proptypes';

class ChallengeScreen extends React.Component {
    componentDidMount() {
        this.props.getChallenges();
    }

    render() {
        /* istanbul ignore next */
        const { challenges } = this.props;
        /* istanbul ignore next */
        const topChallenge = challenges.first(),
            otherChallenges = challenges.slice(1);

        /* istanbul ignore next */
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
