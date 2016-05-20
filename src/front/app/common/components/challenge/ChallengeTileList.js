import React from 'react';
import ChallengeTile from './ChallengeTile';
import ImmutablePropTypes from 'react-immutable-proptypes';

const ChallengeTileList = ({ challenges }) => (
    <div>
        { challenges.map((challenge, index) => (
            <ChallengeTile key={ index } challenge={ challenge } />
        ))}
    </div>
);

ChallengeTileList.propTypes = {
    challenges: ImmutablePropTypes.list.isRequired
};

export default ChallengeTileList;
