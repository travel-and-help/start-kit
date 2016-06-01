import React from 'react';
import { hashHistory } from 'react-router';
import IconButton from './../../../common/components/buttons/IconButton';

export default () => (
    <div className="challenge-nav">
        <IconButton
          buttonClassName={'challenge-nav__item challenge-nav__item_back'}
          iconName={'back'}
          iconSize={30}
          iconClassName={'icon_light'}
          clickHandler={hashHistory.goBack}
        />
        <IconButton
          buttonClassName={'challenge-nav__item challenge-nav__item_watch'}
          iconName={'watchlist'}
          iconSize={36}
          iconClassName={'icon_light'}
        />
    </div>
);
