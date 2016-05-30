import React, { PropTypes } from 'react';
import ChallengeTile from './ChallengeTile';
import ImmutablePropTypes from 'react-immutable-proptypes';

export default class ChallengeTileList extends React.Component {

    static propTypes() {
        /* istanbul ignore next */
        return {
            challenges: ImmutablePropTypes.list.isRequired,
            swipeCallback: PropTypes.function
        };
    }

    constructor(props) {
        super(props);
        this.state = {
            activeChallenge: null,
            activeChallengeSwipedDirection: ''
        };
    }

    onChallengeSwiped(challenge, direction) {
        const { activeChallenge, activeChallengeSwipedDirection } = this.state;
        if (challenge !== activeChallenge) {
            const { swipeCallback } = this.props;
            const swipe = {
                activeChallenge: challenge,
                activeChallengeSwipedDirection: direction
            };
            this.setState(swipe, () => swipeCallback && swipeCallback(swipe));
        } else {
            if (activeChallengeSwipedDirection !== direction) {
                this.setState({
                    activeChallenge: null,
                    activeChallengeSwipedDirection: ''
                });
            }
        }
    }

    getChallengeSwipedDirection(challenge) {
        const { activeChallenge, activeChallengeSwipedDirection } = this.state;
        return challenge === activeChallenge ? activeChallengeSwipedDirection : '';
    }

    render() {
        const { challenges } = this.props;

        /* istanbul ignore next */
        return (
            <div>
                {challenges.map((challenge, index) => (
                    <ChallengeTile
                        key={ index }
                        challenge={ challenge }
                        swipedDirection={this.getChallengeSwipedDirection(challenge)}
                        onSwiped={(direction) => this.onChallengeSwiped(challenge, direction)}
                    />
                ))}
            </div>
        );
    }
}
