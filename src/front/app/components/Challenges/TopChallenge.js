import React from 'react';

const Challenge = ({ challenge = {} }) => (
    <li className="challenges__challengeList__topChallenge">
        <div className="challenges__challengeList__topChallenge__caption">
            <p className="challenges__challengeList__topChallenge__caption__description">
                {challenge.description && challenge.description.toUpperCase()}
            </p>
            <span className="challenges__challengeList__topChallenge__caption__popular">
                Popular this week
            </span>
        </div>
    </li>
);

Challenge.propTypes = {
    challenge: React.PropTypes.object
};

export default Challenge;
