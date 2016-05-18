import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

const ChallengeTile = ({ challenge }) => {
    const {
        title,
        user: {
            rating,
            fullName
        },
        location
    } = challenge.toJS();

    return (
        <li className="challenge" >
            <div className="challenge__image" >Image here</div>
        <span className="challenge__title" >
            {title}
        </span>
            <div className="challenge__user-block" >
            <span className="challenge__rating" >
                {rating}
            </span>
            <span>
                { fullName }
            </span>
            </div>
        <span className="challenge__location" >
            <span className="icon challenge__icon" />
            {location}
        </span>
        </li>
    );
};

ChallengeTile.propTypes = {
    challenge: ImmutablePropTypes.mapContains({
        title: PropTypes.string.isRequired,
        user: ImmutablePropTypes.mapContains({
            rating: PropTypes.number.isRequired,
            fullName: PropTypes.string.isRequired
        }).isRequired,
        location: PropTypes.string.isRequired
    }).isRequired
};

export default ChallengeTile;
