import React, { PropTypes } from 'react';

const Social = ({
    type,
    url
}) => (
    <div>
        <a href={url} className={`social social_${type}` } target="_blank" />
    </div>
);

Social.propTypes = {
    type: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired
};

export default Social;
