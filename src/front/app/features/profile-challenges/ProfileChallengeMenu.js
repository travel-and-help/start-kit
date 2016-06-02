import React from 'react';
import Menu from '../Menu';
import BackButton from '../../common/components/buttons/BackButton';

const backAction = (
    <BackButton
        lightness="dark"
    />
);

const ProfileChallengeMenu = ({ title }) => (
    <Menu
        className="menu_light"
        title={title}
        leftAction={backAction}
    />
);

ProfileChallengeMenu.propTypes = {
    title: React.PropTypes.string.isRequired
};

export default ProfileChallengeMenu;
