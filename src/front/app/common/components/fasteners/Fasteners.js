import React from 'react';
import Fastener from './Fastener';

/* istanbul ignore next */
const Fasteners = ({ className }) => (
    <div className={`fasteners ${className}`}>
        <Fastener />
        <Fastener />
    </div>
);

Fasteners.propTypes = {
    className: React.PropTypes.string
};

export default Fasteners;
