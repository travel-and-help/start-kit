import React from 'react';
import { Link } from 'react-router';

const NavigationItem = ({ link, iconClass }) => (
    <li className="navigation__item">
        <Link to={ link } className="navigation__link" >
            <span className={iconClass}></span>
        </Link>
    </li>
);

NavigationItem.propTypes = {
    link: React.PropTypes.string,
    iconClass: React.PropTypes.string
};

export default NavigationItem;
