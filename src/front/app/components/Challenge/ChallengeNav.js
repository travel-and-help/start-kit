import React from 'react';
import { hashHistory } from 'react-router';
import IconButton from './../IconButton';

export default () => (
    <div className="challenge-nav">
        <IconButton
            buttonClassName={'challenge-nav__item challenge-nav__item_back'}
            iconName={'keyboard_arrow_left'}
            iconSize={40}
            iconClassName={'icon_light'}
            clickHandler={hashHistory.goBack}
        />
        <IconButton
            buttonClassName={'challenge-nav__item challenge-nav__item_watch'}
            iconName={'bookmark_border'}
            iconSize={40}
            iconClassName={'icon_light'}
        />
    </div>
);
