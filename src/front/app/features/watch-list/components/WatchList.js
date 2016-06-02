import React, { Component, PropTypes } from 'react';
import ChallengeTileList from '../../main/challenges/components/ChallengeTileList';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { hashHistory } from 'react-router';
import IconButton from '../../../common/components/buttons/IconButton';

class WatchList extends Component {
    componentDidMount() {
        this.props.getWatchedChallenges();
    }
    render() {
        const { challenges, unWatchChallenge } = this.props;
        return (
            <div className="main-screen watch-list" >
                <div className="main-screen__menu" >
                    <IconButton
                        buttonClassName={'challenge-nav__item challenge-nav__item_back'}
                        iconName={'back'}
                        iconSize={30}
                        iconClassName={'icon_light'}
                        clickHandler={hashHistory.goBack}
                    />
                    <div>{/* Watch List title */}</div>
                </div>
                <div className="main-screen__content">
                    <div className="challenge-tile-wrap">
                        <div className="top-watchlist-tile">&nbsp;</div>
                    </div>
                    <ChallengeTileList challenges={challenges} dismiss={unWatchChallenge} />
                </div>
            </div>
        );
    }
}

WatchList.propTypes = {
    challenges: ImmutablePropTypes.list.isRequired,
    getWatchedChallenges: PropTypes.func.isRequired,
    unWatchChallenge: PropTypes.func.isRequired
};

export default WatchList;
