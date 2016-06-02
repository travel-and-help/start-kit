import React from 'react';
import Menu from '../../../Menu';
import IconButton from '../../../../common/components/buttons/IconButton';

const searchAction = (
    <IconButton
        iconName="search"
        iconSize={24}
        iconClassName={'icon_dark'}
    />
);

const addAction = (
    <IconButton
        iconName="add"
        iconSize={24}
    />
);

const ChallengeScreenMenu = () => (
    <Menu
        className="menu_light"
        title="all challenges"
        leftAction={searchAction}
        rightAction={addAction}
    />
);

export default ChallengeScreenMenu;
