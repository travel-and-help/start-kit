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
            leftSwipe: ImmutablePropTypes.mapContains({
                action: PropTypes.func.isRequired,
                type: PropTypes.string,
                text: PropTypes.string
            }),
            rightSwipe: ImmutablePropTypes.mapContains({
                action: PropTypes.func.isRequired,
                type: PropTypes.string,
                text: PropTypes.string
            })
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
            return this.props.leftSwipe;
        }

        if (direction === RIGHT) {
            return this.props.rightSwipe;
        }

        return null;
    }

    renderAction(challenge, swipedDirection) {

        if (swipedDirection === LEFT) {
            const leftSwipe = this.props.leftSwipe.toJS();
            return (
                <ChallengeTileAction
                    type={leftSwipe.type}
                    text={leftSwipe.text}
                    onClick={() => leftSwipe.action(challenge)}
                />
            );
        }

        if (swipedDirection === RIGHT) {
            const rightSwipe = this.props.rightSwipe.toJS();
            return (
                <ChallengeTileAction
                    type={rightSwipe.type}
                    text={rightSwipe.text}
                    onClick={() => rightSwipe.action(challenge)}
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
