import React, { PropTypes } from 'react';
import { list } from 'react-immutable-proptypes';
import ProfileChallengeList from './ProfileChallengeList';
import { CREATED, ACCEPTED, COMPLETED } from '../../../../profile-challenges/challengeStatus';

const ProfileChallenges = ({
    created,
    accepted,
    completed,
    onShowAllClick
}) => (
    <div className="profile__challenges" >

        <ProfileChallengeList
            status={CREATED}
            challenges={created}
            onShowAllClick={() => onShowAllClick(CREATED)}
        />

        <ProfileChallengeList
            status={COMPLETED}
            challenges={completed}
            onShowAllClick={() => onShowAllClick(COMPLETED)}
        />

        <ProfileChallengeList
            status={ACCEPTED}
            challenges={accepted}
            onShowAllClick={() => onShowAllClick(ACCEPTED)}
        />
    </div>
);

ProfileChallenges.propTypes = {
    created: list.isRequired,
    accepted: list.isRequired,
    completed: list.isRequired,
    onShowAllClick: PropTypes.func.isRequired
};

export default ProfileChallenges;
