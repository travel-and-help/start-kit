import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import ChallengeTileInfo from '../../../../common/components/challenge/ChallengeTileInfo';
import TopChallengeBanner from './TopChallengeBanner';

/* istanbul ignore next */
const TopChallengeTile = ({ challenge }) => {
    const {
        title,
        _id,
        image,
        user: {
            rating,
            firstName
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
                        link={`challenge/${_id}`}
                        className="top-challenge-tile__info"
                        title={title}
                        userName={firstName}
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
        _id: PropTypes.string.isRequired,
        user: ImmutablePropTypes.mapContains({
            rating: PropTypes.number.isRequired,
            firstName: PropTypes.string.isRequired
        }).isRequired,
        location: PropTypes.string.isRequired
    }).isRequired
};

export default TopChallengeTile;

