import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import ChallengeList from '../../../../../common/components/challenge/ChallengeTileList';
import Fasteners from '../../../../../common/components/fasteners/Fasteners';

const ProfileChallengeList = ({
    status,
    challenges,
    onShowAllClick,
}) => {

    let actions = null;
    if (challenges.size) {
        actions = (
            <button
                className="profile-challenge-list__btn"
                onClick={onShowAllClick}
            >
                Show all
            </button>
        );
    } else {
        actions = (
            <div className="profile-challenge-list__empty" >
                You haven’t {status} any challenges yet.
            </div>
        );
    }

    return (
        <div className="profile-challenge-list__section_accepted" >
            <h4
                className={`
                profile-challenge-list__title
                profile-challenge-list__title_${status}`}
            >
                {`${status} challenges`}
            </h4>

            <ChallengeList challenges={ challenges } />

            <div className="profile-challenge-list__btn-wrap" >
                <Fasteners className="challenge-tile-wrap__fasteners" />
                {actions}
            </div>
        </div>
    );
};

ProfileChallengeList.propTypes = {
    status: PropTypes.string.isRequired,
    challenges: ImmutablePropTypes.list,
    onShowAllClick: PropTypes.func
};

export default ProfileChallengeList;
