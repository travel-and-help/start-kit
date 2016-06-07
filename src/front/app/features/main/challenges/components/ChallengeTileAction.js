import React, { PropTypes } from 'react';
import IconButton from '../../../../common/components/buttons/IconButton';

const ChallengeTileAction = ({ type, text, onClick }) => (
    <div
        className={`challenge-tile-action challenge-tile-action_${type}`}
        onClick={onClick}
    >
        <IconButton
            iconName={type}
        />

        <span className="challenge-tile-action__text" >
            {text}
        </span>
    </div>
);

ChallengeTileAction.propTypes = {
    type: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
};

export default ChallengeTileAction;
