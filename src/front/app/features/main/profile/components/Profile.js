import React, { PropTypes } from 'react';
import ChallengeStats from './stats/ChallengeStatsContainer';

import Socials from './socials/Socials';
import ProfileChallenges from './challenges/ProfileChallengesContainer';
const Profile = ({
    profile: {
        photo,
        fullName,
        rating,
        social
    },
    onWatchListClick
}) => (
    <div className="profile" >
        <div className="profile__user-info" >
            <div className="profile__avatar-block" >
                <div
                    className="profile__watchlist-link"
                    onClick={onWatchListClick}
                >
                </div>

                <img className="profile__image" src={photo} title={fullName} />

                <div className="profile__rating-container" >
                    <span className="profile__rating" >{rating}</span>
                    <i className="profile__rating-icon" />
                </div>
            </div>

            <div className="profile__full-name" >
                {fullName}
            </div>

            <ChallengeStats />
        </div>

        <div className="profile__content" >

            <Socials list={social} />

            <ProfileChallenges />
        </div>
    </div>
);

Profile.propTypes = {
    profile: PropTypes.shape({
        social: PropTypes.array,
        fullName: PropTypes.string,
        photo: PropTypes.string,
        rating: PropTypes.number
    }).isRequired,
    onWatchListClick: PropTypes.func.isRequired
};

export default Profile;
