import React, { Component, PropTypes } from 'react';
import ChallengeTileList from '../../../common/components/challenge/ChallengeTileList';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { hashHistory } from 'react-router';
import IconButton from '../../../common/components/buttons/IconButton';
import { RIGHT } from '../../../common/components/challenge/swipeDirections';

class WatchList extends Component {
    componentDidMount() {
        this.props.getInitialChallenges();
    }
    render() {
        const { challenges, unWatchChallenge } = this.props;
        return (
            <div className="main-screen watch-list" >
                <div className="main-screen__menu" >
                    <IconButton
                        buttonClassName={'challenge-nav__item challenge-nav__item_back'}
                        iconName={'keyboard_arrow_left'}
                        iconSize={40}
                        iconClassName={'icon_light'}
                        clickHandler={hashHistory.goBack}
                    />
                    <div>Watch List</div>
                </div>
                <div className="challenges">
                    <br />
                    <ChallengeTileList challenges={challenges} swipeCallback={swipeCallback} />
                </div>
            </div>
        );

        function swipeCallback(swipe) {
            if (swipe.activeChallengeSwipedDirection === RIGHT) {
                unWatchChallenge(swipe.activeChallenge);
            }
        }
    }
}

WatchList.propTypes = {
    challenges: ImmutablePropTypes.list.isRequired,
    getInitialChallenges: PropTypes.func.isRequired,
    unWatchChallenge: PropTypes.func.isRequired
};

export default WatchList;
