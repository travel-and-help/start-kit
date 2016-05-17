import React from 'react';
import { Link } from 'react-router';

const NavigationItem = ({ link, iconClass }) => (
    <div className="navigation-item-wrapper" >
        <Link
          className={`navigation-item navigation-item_${iconClass}`}
          activeClassName="navigation-item_active"
          to={link}
        />
    </div>
);

NavigationItem.propTypes = {
    link: React.PropTypes.string,
    iconClass: React.PropTypes.string
};

export default NavigationItem;
