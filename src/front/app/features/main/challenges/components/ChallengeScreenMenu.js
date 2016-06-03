import React from 'react';
import { Link } from 'react-router';
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
    <Link to={'/create'}>
        <IconButton
            iconName="add"
            iconSize={24}
        />
    </Link>
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
