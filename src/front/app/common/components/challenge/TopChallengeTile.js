import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import ChallengeTileInfo from './ChallengeTileInfo';
import TopChallengeBanner from './TopChallengeBanner';

/* istanbul ignore next */
const TopChallengeTile = ({ challenge }) => {
    const {
        title,
        image,
        user: {
            rating,
            fullName
        },
        location
    } = challenge.toJS();

    const style = {
        background: `url(${image}) no-repeat`
    };

    return (
        <div className="challenge-tile-wrap" >
            <div
                className="top-challenge-tile"
                style={style}
            >
                <TopChallengeBanner />

                <div className="top-challenge-tile__info-wrap" >
                    <ChallengeTileInfo
                        className="top-challenge-tile__info"
                        title={title}
                        userName={fullName}
                        userRank={rating}
                        location={location}
                    />
                </div>
            </div>
        </div>
    );
};

TopChallengeTile.propTypes = {
    challenge: ImmutablePropTypes.mapContains({
        title: PropTypes.string.isRequired,
        user: ImmutablePropTypes.mapContains({
            rating: PropTypes.number.isRequired,
            fullName: PropTypes.string.isRequired
        }).isRequired,
        location: PropTypes.string.isRequired
    }).isRequired
};

export default TopChallengeTile;

