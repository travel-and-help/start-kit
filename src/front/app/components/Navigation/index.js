import React from 'react';
import NavigationItem from './NavigationItem';

const navigationItemData = [
    'challenges',
    'awards',
    'updates',
    'profile'
];

export default () => (
    <nav className="navigation">
        {navigationItemData.map((link, index) => (
            <NavigationItem link={link} iconClass={`sprite-${link}`} key={index} />
        ))}
    </nav>
);
