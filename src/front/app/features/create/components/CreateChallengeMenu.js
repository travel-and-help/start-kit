import React from 'react';
import BackButton from '../../../common/components/buttons/BackButton';
import Menu from '../../Menu';

const postButton = (
    <button
        className="create-challenge-menu__post"
        type="submit"
    >
        Post
    </button>
);

const CreateChallengeMenu = () => (
    <Menu
        className="create-challenge-menu"
        title="create challenge"
        leftAction={<BackButton />}
        rightAction={postButton}
    />
);

export default CreateChallengeMenu;
