import React from 'react';
import NavigationItem from './NavigationItem';

const navigationItemData = [
    'challenges',
    'awards',
    'updates',
    'profile'
];

export default () => (
    <ul className="navigation">
        {navigationItemData.map((link, index) => (
            < NavigationItem link={link} key={index} />
        ))}
    </ul>
);
