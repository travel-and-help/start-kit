import React, { PropTypes } from 'react';

const ChallengeTileAction = ({ type, text, onClick }) => (
    <div
        className={`challenge-tile-action challenge-tile-action_${type}`}
        onClick={onClick}
    >
        <i className={`challenge-tile-action__icon challenge-tile-action__icon_${type}`} />
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
