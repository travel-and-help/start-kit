import React from 'react';

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
    title: React.propTypes.string,
    iconName: React.propTypes.string.isRequired,
    clickHandler: React.propTypes.func,
    iconSize: React.propTypes.number,
    iconClassName: React.propTypes.string,
    buttonClassName: React.propTypes.string,
    buttonType: React.propTypes.string
};

export default IconButton;
