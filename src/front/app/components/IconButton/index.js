import React from 'react';

const IconButton = ({
    title,
    buttonClassName,
    iconClassName,
    clickHandler
}) => (
    <button onClick={clickHandler} className={buttonClassName}>
        <span className={iconClassName}></span>
        {title}
    </button>
);

IconButton.propTypes = {
    title: React.PropTypes.string,
    className: React.PropTypes.string,
    iconClassName: React.PropTypes.string,
    clickHandler: React.PropTypes.func
};

export default IconButton;
