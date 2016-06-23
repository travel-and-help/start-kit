import React from 'react';
import { Link } from 'react-router';

const NavigationItem = ({ link, iconClass }) => (
    <Link
        className={`navigation-item navigation-item_${iconClass}`}
        activeClassName="navigation-item_active"
        to={link}
    />
);

NavigationItem.propTypes = {
    link: React.PropTypes.string,
    iconClass: React.PropTypes.string
};

export default NavigationItem;
