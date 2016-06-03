import React, { PropTypes } from 'react';

const Social = ({ name, url }) => (
    <li>
      <a href={url} target="_blank">
          <span className="sprite" title={name} ></span>
      </a>
    </li>
);

Social.propTypes = {
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired
};

export default Social;
