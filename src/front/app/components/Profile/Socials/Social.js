import React from 'react';

const Social = ({ name, url}) => (
    <li>
        <a href={url} target="_blank">
            <span className={'sprite sprite-'  + name} title={name} ></span>
        </a>
    </li>
);

Social.propTypes = {
    name: React.PropTypes.string.isRequired,
    url: React.PropTypes.string.isRequired
};

export default Social;
