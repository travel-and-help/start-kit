import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import rankToType from './rankToType';

const ChallengeTile = ({ link, title, userName, userRank, location, className }) => {
    const rankCssClass = `challenge-tile-info__user-rank 
        challenge-tile-info__user-rank_${rankToType(userRank)}`;
    return (
        <Link
            className={`challenge-tile-info ${className}`}
            to={link}
        >
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

                <div className={ rankCssClass }>
                    {userRank}
                </div>
            </div>

        </Link>
    );
};

ChallengeTile.propTypes = {
    link: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    userName: PropTypes.string,
    userRank: PropTypes.number,
    location: PropTypes.string.isRequired,
    className: PropTypes.string
};

export default ChallengeTile;
