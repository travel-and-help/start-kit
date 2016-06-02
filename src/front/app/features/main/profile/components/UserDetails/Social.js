import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

const Social = ({ social }) => {
    const {
        type,
        url
        } = social.toJS();
    const cssClass = `user-details__social-icon user-details__social-icon_${type}`;
    return (
        <div>
            <a href={url} className={ cssClass } />
        </div>
    );
};

Social.propTypes = {
    social: ImmutablePropTypes.mapContains({
        title: PropTypes.string.isRequired,
        link: PropTypes.string.isRequired
    }).isRequired
};

export default Social;
