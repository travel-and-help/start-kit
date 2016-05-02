import React from 'react';
import Challenge from './ChallengeTile';
import ImmutablePropTypes from 'react-immutable-proptypes';

const ChallengeList = ({ challenges }) => (
    <ul className="challenges__list" >
        { challenges.map((challenge, index) => (
            <Challenge key={ index } challenge={ challenge } />
        ))}
    </ul>
);

ChallengeList.propTypes = {
    challenges: ImmutablePropTypes.list.isRequired
};

export default ChallengeList;
