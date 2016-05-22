import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import ImmutablePropTypes from 'react-immutable-proptypes';

const ChallengeJumbotron = ({ challenge }) => {
    const { title, _id } = challenge.toJS();
    return (
        <Link to={`challenge/${_id}`}>

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

        </Link>
    );
};

ChallengeJumbotron.propTypes = {
    challenge: ImmutablePropTypes.mapContains({
        title: PropTypes.string.isRequired
    }).isRequired
};

export default ChallengeJumbotron;
