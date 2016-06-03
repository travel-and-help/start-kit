import React, { PropTypes } from 'react';

const Stat = ({ title, value, icon }) => (
    <li className="user__stats__item" >
        <div className="user__stats__item__value" >
            {icon ? [
                <a href={value} >
                    <span className={icon} ></span>
                </a>
            ] : value}
        </div>
        <div className="user__stats__item__title" >
            {title}
        </div>
    </li>
);

Stat.propTypes = {
    title: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired
};

export default Stat;
