import React from 'react';
import Navigation from './navigation';

const MainScreen = ({ children }) => (
    <div className="main-screen" >
        <div className="main-screen__content" >
            {children}
        </div>

        <div className="main-screen__navigation" >
            <Navigation />
        </div>
    </div>
);

MainScreen.propTypes = {
    children: React.PropTypes.element
};

export default MainScreen;
