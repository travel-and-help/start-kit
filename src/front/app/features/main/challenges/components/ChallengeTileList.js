import React, { PropTypes } from 'react';
import ChallengeTile from '../../../../common/components/challenge/ChallengeTile';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Swipeable from 'react-swipeable';
import { LEFT, RIGHT } from './swipeDirections';
import Fasteners from '../../../../common/components/fasteners/Fasteners';
import ChallengeTileAction from './ChallengeTileAction';

export default class ChallengeTileList extends React.Component {

    static propTypes() {
        return {
            challenges: ImmutablePropTypes.list.isRequired,
            addToWatchList: PropTypes.func.isRequired,
            dismiss: PropTypes.func.isRequired
        };
    }

    constructor(props) {
        super(props);
        this.state = {
            activeChallenge: null,
            activeChallengeSwipedDirection: ''
        };
    }

    onSwiped(challenge, direction) {
        const { activeChallenge, activeChallengeSwipedDirection } = this.state;
        if (challenge !== activeChallenge) {
            this.setState({
                activeChallenge: challenge,
                activeChallengeSwipedDirection: direction
            });
        } else {
            if (activeChallengeSwipedDirection !== direction) {
                this.setState({
                    activeChallenge: null,
                    activeChallengeSwipedDirection: ''
                });
            }
        }
    }

    getSwipedDirection(challenge) {
        const { activeChallenge, activeChallengeSwipedDirection } = this.state;
        return challenge === activeChallenge ? activeChallengeSwipedDirection : '';
    }

    renderAction(challenge, swipedDirection) {

        if (swipedDirection === LEFT) {
            return (
                <ChallengeTileAction
                    type="watch"
                    text="To watchlist"
                    onClick={() => this.props.addToWatchList(challenge)}
                />
            );
        }

        if (swipedDirection === RIGHT) {
            return (
                <ChallengeTileAction
                    type="dismiss"
                    text="Dismiss"
                    onClick={() => this.props.dismiss(challenge)}
                />
            );
        }

        return null;
    }

    render() {
        const { challenges } = this.props;

        return (
            <div>
                {challenges.map((challenge, index) => {
                    const swipedDirection = this.getSwipedDirection(challenge);

                    return (
                        <Swipeable
                            key={ index }
                            className={`
                            challenge-tile-wrap
                            challenge-tile-wrap_swiped-${swipedDirection}
                            `}
                            onSwipedLeft={() => this.onSwiped(challenge, LEFT)}
                            onSwipedRight={() => this.onSwiped(challenge, RIGHT)}
                        >
                            <Fasteners className="challenge-tile-wrap__fasteners" />

                            <ChallengeTile challenge={ challenge } />

                            {this.renderAction(challenge, swipedDirection)}

                        </Swipeable>
                    );
                })}
            </div>
        );
    }
}
