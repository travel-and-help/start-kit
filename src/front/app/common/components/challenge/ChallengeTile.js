import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import ChallengeTileInfo from './ChallengeTileInfo';

const ChallengeTile = ({ challenge }) => {
    const {
        title,
        _id,
        image,
        location,
        user,
    } = challenge.toJS();

    return (
        <div className="challenge-tile" >
            <div
                className="challenge-tile__image"
                style={{ backgroundImage: `url(${image})` }}
            ></div>
            <ChallengeTileInfo
                className="challenge-tile__info"
                link={`challenge/${_id}`}
                title={title}
                userName={user.fullName}
                userRank={user.rating}
                location={location}
            />
        </div>
    );
};

ChallengeTile.propTypes = {
    challenge: ImmutablePropTypes.mapContains({
        title: PropTypes.string.isRequired,
        _id: PropTypes.string.isRequired,
        image: PropTypes.string,
        user: ImmutablePropTypes.mapContains({
            rating: PropTypes.number,
            fullName: PropTypes.string
        }),
        location: PropTypes.string.isRequired
    }).isRequired
};

export default ChallengeTile;
