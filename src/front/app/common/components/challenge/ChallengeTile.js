import React, { PropTypes } from 'react';
import ChallengeTileInfo from './ChallengeTileInfo';
import ImmutablePropTypes from 'react-immutable-proptypes';

const ChallengeTile = ({ challenge }) => {
    const {
        title,
        user: {
            rating,
            firstName
        },
        location
    } = challenge.toJS();

    return (
        <div className="challenge-tile" >
            <img
              className="challenge-tile__image"
              src="http://placekitten.com/70/70"
            />
            <ChallengeTileInfo
              className="challenge-tile__info"
              title={title}
              userName={firstName}
              userRank={rating}
              location={location}
            />
        </div>
    );
};

ChallengeTile.propTypes = {
    challenge: ImmutablePropTypes.mapContains({
        title: PropTypes.string.isRequired,
        user: ImmutablePropTypes.mapContains({
            rating: PropTypes.number.isRequired,
            firstName: PropTypes.string.isRequired
        }).isRequired,
        location: PropTypes.string.isRequired
    }).isRequired
};

export default ChallengeTile;
