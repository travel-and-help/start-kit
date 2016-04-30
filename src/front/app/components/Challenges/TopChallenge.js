import React from 'react';

const TopChallenge = ({ title }) => (
    <li className="topChallenge">
        <div className="topChallenge__caption">
            <p className="topChallenge__title">
                {title}
            </p>
            <span className="topChallenge__popular">
                Popular this week
            </span>
        </div>
    </li>
);

TopChallenge.propTypes = {
    title: React.PropTypes.string.isRequired
};

export default TopChallenge;
