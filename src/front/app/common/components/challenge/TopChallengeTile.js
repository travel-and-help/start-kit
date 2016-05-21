import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import ChallengeTileInfo from './ChallengeTileInfo';

const TopChallengeTile = ({ challenge }) => {
    const {
        title,
        user: {
            rating,
            firstName
        },
        location
    } = challenge.toJS();

    const style = {
        background: 'url(http://placekitten.com/349/188) no-repeat'
    };

    return (
        <div className="top-challenge-tile" style={style} >

            <div className="top-challenge-tile__banner" >
                Popular this week
            </div>

            <div className="top-challenge-tile__info-wrap" >
                <ChallengeTileInfo
                  className="top-challenge-tile__info"
                  title={title}
                  userName={firstName}
                  userRank={rating}
                  location={location}
                />
            </div>
        </div>
    );
};

TopChallengeTile.propTypes = {
    challenge: ImmutablePropTypes.mapContains({
        title: PropTypes.string.isRequired,
        user: ImmutablePropTypes.mapContains({
            rating: PropTypes.number.isRequired,
            firstName: PropTypes.string.isRequired
        }).isRequired,
        location: PropTypes.string.isRequired
    }).isRequired
};

export default TopChallengeTile;

