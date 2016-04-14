import React from 'react';
import NavigationItem from './NavigationItem';

const navigationItemData = [
    {
        link: 'challenges',
        icon: '&#xEB40;'
    },
    {
        link: 'awards',
        icon: '&#xE838;'
    },
    {
        link: 'updates',
        icon: '&#xE7F4;'
    },
    {
        link: 'profile',
        icon: '&#xE7FD;'
    }
];

export default () => (
    <ul className="navigation">
        {navigationItemData.map((item, index) => (
            < NavigationItem item={item} key={index} />
        ))}
    </ul>
);
