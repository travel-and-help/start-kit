import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import ImmutablePropTypes from 'react-immutable-proptypes';

const ChallengeTile = ({ challenge }) => {
    const {
        title,
        _id,
        user: {
            rating,
            firstName,
            lastName
        },
        location
    } = challenge.toJS();

    return (
        <Link to={`challenge/${_id}`}>
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
                    {firstName} {lastName}
                </span>
                </div>
            <span className="challenge__location" >
                <span className="icon challenge__icon" />
                {location}
            </span>
            </li>
        </Link>
    );
};

ChallengeTile.propTypes = {
    challenge: ImmutablePropTypes.mapContains({
        title: PropTypes.string.isRequired,
        user: ImmutablePropTypes.mapContains({
            rating: PropTypes.number.isRequired,
            firstName: PropTypes.string.isRequired,
            lastName: PropTypes.string.isRequired
        }).isRequired,
        location: PropTypes.string.isRequired
    }).isRequired
};

export default ChallengeTile;
