import React from 'react';
import Navigation from './navigation';

const MainScreen = ({ children }) => (
    <div>
        {children}
        <Navigation />
    </div>
);

MainScreen.propTypes = {
    children: React.PropTypes.element
};

export default MainScreen;
