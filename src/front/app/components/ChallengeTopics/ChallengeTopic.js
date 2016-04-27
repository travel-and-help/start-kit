import React, { PropTypes } from 'react';

const ChallengeTopic = ({ onClick, name }) => (
    <li onClick={onClick}>
        {name}
    </li>
);

ChallengeTopic.propTypes = {
    onClick: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired
};

export default ChallengeTopic
