import React from 'react';
import { Link } from 'react-router';
import Menu from '../../../Menu';
import IconButton from '../../../../common/components/buttons/IconButton';


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
        rightAction={addAction}
    />
);

export default ChallengeScreenMenu;

/* TODO

line 5
 const searchAction = (
 <IconButton
 iconName="search"
 iconSize={24}
 iconClassName={'icon_dark'}
 />
 );

 line 20
 leftAction={searchAction}

*/
