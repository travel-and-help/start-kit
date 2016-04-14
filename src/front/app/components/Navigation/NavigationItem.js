import React from 'react';
import { Link } from 'react-router';

export default ({ item }) => (
    <li className="navigation__item">
        <Link to={item.link} className="icon" dangerouslySetInnerHTML={{__html: item.icon}} />
    </li>
);
