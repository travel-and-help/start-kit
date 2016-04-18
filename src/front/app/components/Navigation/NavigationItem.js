import React from 'react';
import { Link } from 'react-router';

const NavigationItem = ({ link }) => {
    const iconClass = `icon navigation__${link}`;

    return (
        <li className="navigation__item">
            <Link to={ link } className="navigation__link" >
                <span className={iconClass}></span>
            </Link>
        </li>
    );
};

NavigationItem.propTypes = {
    link: React.PropTypes.string
};

export default NavigationItem;
