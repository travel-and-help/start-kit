import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import ChallengeList from '../../../../common/components/challenge/ChallengeTileList';
import SocialList from './SocialList';


const getChallenges = (user, status) => (
    user.get('challenges')
        .filter(challenge => challenge.get('status') === status)
        .map(challenge => challenge.get('challenge'))
);

const UserDetailsContainer = ({ user }) => {
    const {
        photo,
        firstName,
        lastName,
        locations,
        categories,
        rating } = user.toJS();

    const acceptedChallenges = getChallenges(user, 'accepted'),
        completedChallenges = getChallenges(user, 'completed'),
        createdChallenges = getChallenges(user, 'created');


    return (
        <div className="user-details">
            <div className="user-details__user-info">
                <div className="user-details__avatar-block" >
                    <span>Icon</span>
                    <img className="user-details__image" src={photo} title={firstName} />
                    <span className="" >{rating}</span>
                </div>

                <div className="user-details__full-name">
                    {firstName}
                    {lastName}
                </div>

                <div className="user-details__challenges-stats">
                    <div>
                        <span>Created</span>
                        <span>{createdChallenges.size}</span>
                    </div>
                    <div>
                        <span>Accepted</span>
                        <span>{acceptedChallenges.size}</span>
                    </div>
                    <div>
                        <span>Completed</span>
                        <span>{completedChallenges.size}</span>
                    </div>
                </div>
            </div>

            <div className="user-details__additional-info">
                <div className="" >
                    <h4 className="" >Locations</h4>
                    <div className="" >{locations.join(', ')}</div>
                </div>
                <div className="" >
                    <h4 className="" >Categories</h4>
                    <div className="" >{categories.join(', ')}</div>
                </div>
                <div className="" >
                    <h4 className="" >Web</h4>
                    <SocialList socials={user.get('web')} />
                </div>
            </div>

            <div className="user-details__challenges-container">
                <div className="" >
                    <h4 className="" >Created Challenges</h4>
                    <div className="section-container__description" >
                        <ChallengeList challenges={createdChallenges} />
                    </div>
                </div>
                <div className="" >
                    <h4 className="" >Accepted Challenges</h4>
                    <div className="" >
                        <ChallengeList challenges={acceptedChallenges} />
                    </div>
                </div>
                <div className="section-container" >
                    <h4 className="" >Completed Challenges</h4>
                    <div className="" >
                        <ChallengeList challenges={completedChallenges} />
                    </div>
                </div>
            </div>
        </div>
    );
};

UserDetailsContainer.propTypes = {
    user: ImmutablePropTypes.mapContains({
        challenges: ImmutablePropTypes.list,
        categories: ImmutablePropTypes.list,
        web: ImmutablePropTypes.list,
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
        photo: PropTypes.string,
        rating: PropTypes.number
    }).isRequired
};

export default UserDetailsContainer;
