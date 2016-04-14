import React from 'react';

let Challenge = ({ challenge = {} }) => (
    <li className="challenges__challengeList__challenge">
        <div className="challenges__challengeList__challenge__image">Image here</div>
        <span className="challenges__challengeList__challenge__description">
            {challenge.description && challenge.description.toUpperCase()}
        </span>
        <div className="challenges__challengeList__challenge__user-block">
            <span className="challenges__challengeList__challenge__user-block__rating">
                {challenge.user && challenge.user.rating}
            </span>
            <span>{challenge.user && challenge.user.firstName} {challenge.user && challenge.user.lastName}</span>
        </div>
        <span className="challenges__challengeList__challenge__location">
            <span className="challenges__challengeList__challenge__location__icon" dangerouslySetInnerHTML={{__html: '&#xE55F'}} />
            {challenge.location}
        </span>
    </li>
);

export default Challenge;
