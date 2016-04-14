import React from 'react';
import { Link } from 'react-router';

const NavigationItem = ({ item }) => (
    <li className="navigation__item">
        <Link to={ item.link } className="icon"
              dangerouslySetInnerHTML={{ __html: item.icon }} />
    </li>
);

NavigationItem.propTypes = {
    item: React.PropTypes.object
};

export default NavigationItem;
