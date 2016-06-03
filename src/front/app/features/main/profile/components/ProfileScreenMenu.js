import React from 'react';
import Menu from '../../../Menu';
import IconButton from '../../../../common/components/buttons/IconButton';

const configAction = (
    <IconButton
        iconName="settings"
        iconSize={24}
    />
);

const ProfileScreenMenu = () => (
    <Menu
        className="menu_light"
        title="your profile"
        rightAction={configAction}
    />
);

export default ProfileScreenMenu;

