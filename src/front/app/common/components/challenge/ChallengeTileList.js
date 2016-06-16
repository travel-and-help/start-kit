import React, { PropTypes } from 'react';
import ChallengeTile from './ChallengeTile';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Swipeable from 'react-swipeable';
import { LEFT, RIGHT, NO } from './swipeDirections';
import Fasteners from '../fasteners/Fasteners';
import ChallengeTileAction from '../../../features/main/challenges/components/ChallengeTileAction';

export default class ChallengeTileList extends React.Component {

    static propTypes() {
        return {
            className: PropTypes.string,
            challenges: ImmutablePropTypes.list.isRequired,
            addToWatchList: PropTypes.func.isRequired,
            dismiss: PropTypes.func.isRequired,
            leftSwipeAction: ImmutablePropTypes.mapContains({
                action: PropTypes.func.isRequired,
                type: PropTypes.string,
                text: PropTypes.string
            }).isRequired
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
            if (this.isSwipeDirectionAvailable(direction)) {
                this.setState({
                    activeChallenge: challenge,
                    activeChallengeSwipedDirection: direction
                });
            }
        } else if (activeChallengeSwipedDirection !== direction) {
            this.setState({
                activeChallenge: null,
                activeChallengeSwipedDirection: NO
            });
        }
    }

    getSwipedDirection(challenge) {
        const { activeChallenge, activeChallengeSwipedDirection } = this.state;
        return challenge === activeChallenge ? activeChallengeSwipedDirection : '';
    }

    isSwipeDirectionAvailable(direction) {
        if (direction === LEFT) {
            // return this.props.addToWatchList;
            return this.props.leftSwipeAction.action;
        }

        if (direction === RIGHT) {
            return this.props.dismiss;
        }

        return null;
    }

    renderAction(challenge, swipedDirection) {

        if (swipedDirection === LEFT) {
            return (
                // <ChallengeTileAction
                //     type="watch"
                //     text="To watchlist"
                //     onClick={() => this.props.addToWatchList(challenge)}
                // />
                <ChallengeTileAction
                    type={this.props.leftSwipeAction.type}
                    text={this.props.leftSwipeAction.text}
                    onClick={() => this.props.leftSwipeAction.action(challenge)}
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
        const { challenges, className } = this.props;

        return (
            <div>
                {challenges.map((challenge, index) => {
                    const swipedDirection = this.getSwipedDirection(challenge);

                    return (
                        <Swipeable
                            key={ index }
                            className={`
                                ${className}
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
