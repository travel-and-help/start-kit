import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Link } from 'react-router';
import ChallengeList from '../../../../../common/components/challenge/ChallengeTileList';
import SocialList from './SocialList';
import Fasteners from '../../../../../common/components/fasteners/Fasteners';

const UserDetailsContainer = ({ user }) => {
    const {
        photo,
        fullName,
        // locations,
        // categories,
        rating } = user.toJS();
    const createdChallenges = user.get('createdChallenges');
    const acceptedChallenges = user.get('acceptedChallenges');
    const completedChallenges = user.get('completedChallenges');
    return (
        <div className="user-details">
            <div className="user-details__user-info">
                <div className="user-details__avatar-block" >
                    <Link to="/profile/watch-list" className="user-details__watchlist-link" />
                    <img className="user-details__image" src={photo} title={fullName} />
                    <div className="user-details__rating-container" >
                        <span className="user-details__rating">{rating}</span>
                        <i className="user-details__rating-icon" />
                    </div>
                </div>

                <div className="user-details__full-name">
                    {fullName}
                </div>
                <div className="user-details__stats-container">
                    <div className="user-details__stats user-details__stats_created">
                        <div className="user-details__stats-value
                                        user-details__stats-value_created"
                        >
                            { (createdChallenges && createdChallenges.size) || 0 }
                        </div>
                        <span>Created</span>
                    </div>
                    <div className="user-details__stats user-details__stats_accepted">
                        <div className="user-details__stats-value
                                        user-details__stats-value_accepted"
                        >
                            { (completedChallenges && completedChallenges.size) || 0 }
                        </div>
                        <span>Accepted</span>
                    </div>
                    <div className="user-details__stats user-details__stats_completed">
                        <div className="user-details__stats-value
                                        user-details__stats-value_completed"
                        >
                            { (acceptedChallenges && acceptedChallenges.size) || 0 }
                        </div>
                        <span>Completed</span>
                    </div>
                </div>
            </div>
            <div className="user-details__additional-info-container">
                <Fasteners className="challenge-tile-wrap__fasteners" />
                <div className="user-details__additional-info" >
                    <div className="user-details__additional-title" >On Web</div>
                    <SocialList socials={user.get('social')} />
                </div>
            </div>

            <div className="user-details__challenges-container">
                {createdChallenges && createdChallenges.size && (
                    <div className="user-details__challenges-section">
                        <h4 className="user-details__challenges-title
                                    user-details__challenges-title_created"
                        >
                            Created Challenges
                        </h4>
                        <ChallengeList challenges={ createdChallenges } />
                        <div className="user-details__challenges-btn-container">
                            <Fasteners className="challenge-tile-wrap__fasteners" />
                            <button className="user-details__challenges-btn">Show all</button>
                        </div>
                    </div>
                )}
                {completedChallenges && completedChallenges.size && (
                    <div className="user-details__challenges-section">
                        <h4 className="user-details__challenges-title
                                    user-details__challenges-title_completed"
                        >
                            Completed Challenges
                        </h4>
                        <ChallengeList challenges={ completedChallenges } />
                        <div className="user-details__challenges-btn-container">
                            <Fasteners className="challenge-tile-wrap__fasteners" />
                            <button className="user-details__challenges-btn">Show all</button>
                        </div>
                    </div>
                )}
                {acceptedChallenges && acceptedChallenges.size && (
                    <div className="user-details__challenges-section_accepted">
                        <h4 className="user-details__challenges-title
                                    user-details__challenges-title_accepted"
                        >
                            Accepted Challenges
                        </h4>
                        <ChallengeList challenges={ acceptedChallenges } />
                        <div className="user-details__challenges-btn-container">
                            <Fasteners className="challenge-tile-wrap__fasteners" />
                            <button className="user-details__challenges-btn">Show all</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};


UserDetailsContainer.propTypes = {
    user: ImmutablePropTypes.mapContains({
        acceptedChallenges: ImmutablePropTypes.list,
        completedChallenges: ImmutablePropTypes.list,
        createdChallenges: ImmutablePropTypes.list,
        social: ImmutablePropTypes.list,
        fullName: PropTypes.string.isRequired,
        photo: PropTypes.string,
        rating: PropTypes.number
    }).isRequired
};

export default UserDetailsContainer;
