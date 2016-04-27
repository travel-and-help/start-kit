import React from 'react';

const IconButton = ({
    title,
    buttonClassName,
    iconName,
    iconSize,
    iconClassName,
    clickHandler
}) => (
    <button onClick={clickHandler} className={'icon-button ' + buttonClassName}>
        <i className={'icon icon_size-' + iconSize + ' ' + iconClassName}>{iconName}</i>
        {title}
    </button>
);

IconButton.propTypes = {
    title: React.PropTypes.string,
    buttonClassName: React.PropTypes.string,
    iconName: React.PropTypes.string.isRequired,
    iconSize: React.PropTypes.number,
    iconClassName: React.PropTypes.string,
    clickHandler: React.PropTypes.func
};

export default IconButton;
