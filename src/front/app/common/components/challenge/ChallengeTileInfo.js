import React, { PropTypes } from 'react';
import rankToType from './rankToType';

const ChallengeTile = ({ title, userName, userRank, location, className }) => (
    <div className={`challenge-tile-info ${className}`} >
        <div className="challenge-tile-info__title" >
            {title}
        </div>

        <div className="challenge-tile-info__info" >
            <div className="challenge-tile-info__location" >
                {location}
            </div>

            <div className="challenge-tile-info__user-name" >
                {userName}
            </div>

            <div className={`
                    challenge-tile-info__user-rank
                    challenge-tile-info__user-rank_${rankToType(userRank)}
                 `}
            >
                {userRank}
            </div>
        </div>

    </div>
);

ChallengeTile.propTypes = {
    title: PropTypes.string.isRequired,
    userName: PropTypes.string.isRequired,
    userRank: PropTypes.number.isRequired,
    location: PropTypes.string.isRequired,
    className: PropTypes.string
};

export default ChallengeTile;
