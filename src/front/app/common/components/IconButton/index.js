import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

const iconButton = ({
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

iconButton.propTypes = {
    title: ImmutablePropTypes.string,
    iconName: ImmutablePropTypes.string.isRequired,
    clickHandler: ImmutablePropTypes.func,
    iconSize: ImmutablePropTypes.number,
    iconClassName: ImmutablePropTypes.string,
    buttonClassName: ImmutablePropTypes.string,
    buttonType: ImmutablePropTypes.string
};

export default iconButton;
