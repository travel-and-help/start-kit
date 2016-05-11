import React from 'react';

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
    title: React.PropTypes.string,
    iconName: React.PropTypes.string.isRequired,
    clickHandler: React.PropTypes.func,
    iconSize: React.PropTypes.number,
    iconClassName: React.PropTypes.string,
    buttonClassName: React.PropTypes.string,
    buttonType: React.PropTypes.string
};

export default IconButton;
