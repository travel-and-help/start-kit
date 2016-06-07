import React, { PropTypes } from 'react';
import IconButton from './../../../common/components/buttons/IconButton';
import BackButton from './../../../common/components/buttons/BackButton';
import Menu from '../../Menu';

const leftAction = (
    <BackButton
        lightness="light"
    />
);

const rightAction = onWatch => (
    <IconButton
        iconName={'watch'}
        iconSize={30}
        iconClassName={'icon_light'}
        clickHandler={onWatch}
    />
);

rightAction.propTypes = { onWatch: PropTypes.func.isRequired };

const ChallengeDetailsMenu = ({ isBgVisible, bgImage, title, onWatchChallenge, isWatched }) => {
    const watchAction = !isWatched ? rightAction(onWatchChallenge) : '<i />';
    const menu = (
        <Menu
            className="challenge-details-menu__menu"
            title={isBgVisible ? title : ''}
            leftAction={leftAction}
            rightAction={watchAction}
        />
    );

    return (
        <div className="challenge-details-menu" >
            {!isBgVisible && menu}

            <div
                className="challenge-details-menu__bg"
                style={{
                    backgroundImage: `url(${bgImage})`,
                    display: isBgVisible ? 'block' : 'none'
                }}
            >
                {isBgVisible && menu}
            </div>
        </div>
    );
};

ChallengeDetailsMenu.propTypes = {
    isBgVisible: PropTypes.bool.isRequired,
    bgImage: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    onWatchChallenge: PropTypes.func.isRequired,
    isWatched: PropTypes.bool.isRequired
};

export default ChallengeDetailsMenu;
