import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import ChallengeTileInfo from './ChallengeTileInfo';
import Fasteners from '../fasteners/Fasteners';
import Swipeable from 'react-swipeable';
import { LEFT, RIGHT } from './swipeDirections';

const ChallengeTile = ({
    challenge,
    swipedDirection,
    onSwiped
}) => {
    const {
        title,
        _id,
        image,
        location,
        user: {
            rating,
            firstName
        },
    } = challenge.toJS();

    /* istanbul ignore next */
    return (
        <Swipeable
            className={`challenge-tile-wrap challenge-tile-wrap_swiped-${swipedDirection}`}
            onSwipedLeft={() => onSwiped(LEFT)}
            onSwipedRight={() => onSwiped(RIGHT)}
        >
            <Fasteners className="challenge-tile-wrap__fasteners" />

            <div className="challenge-tile" >
                <img
                    className="challenge-tile__image"
                    src={image}
                />
                <ChallengeTileInfo
                    className="challenge-tile__info"
                    link={`challenge/${_id}`}
                    title={title}
                    userName={firstName}
                    userRank={rating}
                    location={location}
                />
            </div>
        </Swipeable>
    );
};

ChallengeTile.propTypes = {
    challenge: ImmutablePropTypes.mapContains({
        title: PropTypes.string.isRequired,
        _id: PropTypes.string.isRequired,
        image: PropTypes.string,
        user: ImmutablePropTypes.mapContains({
            rating: PropTypes.number.isRequired,
            firstName: PropTypes.string.isRequired
        }).isRequired,
        location: PropTypes.string.isRequired
    }).isRequired,
    swipedDirection: PropTypes.string.isRequired,
    onSwiped: PropTypes.func.isRequired
};

export default ChallengeTile;
