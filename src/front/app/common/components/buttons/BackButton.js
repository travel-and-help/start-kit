import React from 'react';
import IconButton from './IconButton';
import { hashHistory } from 'react-router';

const BackButton = ({ lightness }) => (
    <IconButton
        iconName={'back'}
        iconSize={24}
        iconClassName={`icon_${lightness}`}
        clickHandler={hashHistory.goBack}
    />
);

BackButton.propTypes = {
    lightness: React.PropTypes.string
};

export default BackButton;
