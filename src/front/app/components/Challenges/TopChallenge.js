import React from 'react';

const Challenge = ({ description }) => (
    <li className="topChallenge">
        <div className="topChallenge__caption">
            <p className="topChallenge__description">
                {description && description.toUpperCase()}
            </p>
            <span className="topChallenge__popular">
                Popular this week
            </span>
        </div>
    </li>
);

Challenge.propTypes = {
    description: React.PropTypes.string.isRequired
};

export default Challenge;
