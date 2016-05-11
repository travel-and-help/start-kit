import React from 'react';
import ChallengeTile from './ChallengeTile';
import ImmutablePropTypes from 'react-immutable-proptypes';

const ChallengeTileList = ({ challenges }) => (
    <ul className="challenges__list" >
        { challenges.map((challenge, index) => (
            <ChallengeTile key={ index } challenge={ challenge } />
        ))}
    </ul>
);

ChallengeTileList.propTypes = {
    challenges: ImmutablePropTypes.list.isRequired
};

export default ChallengeTileList;
