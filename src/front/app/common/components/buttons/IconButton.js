import React, { PropTypes } from 'react';

/* istanbul ignore next */
const IconButton = ({
    title,
    iconName,
    clickHandler,
    iconSize = 24,
    iconClassName = '',
    buttonClassName = '',
    buttonType = 'button'
    }) => (
    <button type={buttonType} onClick={clickHandler} className={`icon-button  ${buttonClassName}`}>
        <i className={`icon icon_size-${iconSize} ${iconClassName}`}>{iconName}</i>
        {title}
    </button>
);

IconButton.propTypes = {
    title: PropTypes.string,
    iconName: PropTypes.string.isRequired,
    clickHandler: PropTypes.func,
    iconSize: PropTypes.number,
    iconClassName: PropTypes.string,
    buttonClassName: PropTypes.string,
    buttonType: PropTypes.string
};

export default IconButton;
