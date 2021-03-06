import React from 'react';
import NavigationItem from './NavigationItem';

const navigationItemData = [
    'challenges',
    'awards',
    'updates',
    'profile'
];

export default () => (
    <div className="navigation" >
        {navigationItemData.map((link, index) => (
            <NavigationItem
              link={`main/${link}`}
              iconClass={link}
              key={index}
            />
        ))}
    </div>
);
