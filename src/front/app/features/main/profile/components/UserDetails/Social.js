import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

const Social = ({ social }) => {
    const {
        title,
        link
        } = social.toJS();
    return (
        <div>
            <a href={link}>
                {title}
            </a>
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
