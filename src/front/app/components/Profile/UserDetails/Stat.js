import React from 'react';

const Stat = ({ title, value, icon}) => (
    <li className='user__stats__item' >
        <div className='user__stats__item__value' >
            {icon ? [
                <a href={value} >
                    <span className={icon} ></span>
                </a>
            ] : value}
        </div>
        <div className='user__stats__item__title' >
            {title}
        </div>
    </li>
);

Stat.propTypes = {
    title: React.PropTypes.string.isRequired
};

export default Stat;
