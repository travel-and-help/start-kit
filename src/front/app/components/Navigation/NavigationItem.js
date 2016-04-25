import React from 'react';
import { Link } from 'react-router';

const NavigationItem = ({ link, iconClass }) => (
    <Link to={ link } className="navigation__link" activeClassName="navigation__link--active" >
        <span className={iconClass}></span>
        <p>{link}</p>
    </Link>
);

NavigationItem.propTypes = {
    link: React.PropTypes.string,
    iconClass: React.PropTypes.string
};

export default NavigationItem;
