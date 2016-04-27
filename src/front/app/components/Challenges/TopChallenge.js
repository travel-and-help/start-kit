import React from 'react';

const TopChallenge = ({ description }) => (
    <li className="topChallenge">
        <div className="topChallenge__caption">
            <p className="topChallenge__description">
                {description}
            </p>
            <span className="topChallenge__popular">
                Popular this week
            </span>
        </div>
    </li>
);

TopChallenge.propTypes = {
    description: React.PropTypes.string.isRequired
};

export default TopChallenge;
