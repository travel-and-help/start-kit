import React from 'react';

const Stat = ({ title, value, icon}) => (
    <li class='user__stats__item' >
        <div class='user__stats__item__value' >
            {icon ? [
                <a href={value} >
                    <span class={icon} ></span>
                </a>
            ] : value}
        </div>
        <div class='user__stats__item__title' >
            {title}
        </div>
    </li>
);

Stat.propTypes = {
    title: React.PropTypes.string.isRequired
};

export default Stat;
