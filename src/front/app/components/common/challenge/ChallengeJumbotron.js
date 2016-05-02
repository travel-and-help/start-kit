import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

const TopChallenge = ({ challenge }) => {
    const { title } = challenge.toJS();
    return (
        <li className="topChallenge" >
            <div className="topChallenge__caption" >
                <p className="topChallenge__title" >
                    {title}
                </p>
            <span className="topChallenge__popular" >
                Popular this week
            </span>
            </div>
        </li>
    );
};

TopChallenge.propTypes = {
    challenge: ImmutablePropTypes.mapContains({
        title: PropTypes.string.isRequired
    }).isRequired
};

export default TopChallenge;
