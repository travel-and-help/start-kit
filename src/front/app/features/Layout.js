import React, { PropTypes } from 'react';

/* istanbul ignore next */
const Layout = ({ menu, children, onScroll }) => (
    <div className="layout" >
        <div className="layout__menu" >
            {menu}
        </div>

        <div className="layout__content" onScroll={onScroll}>
            {children}
        </div>
    </div>
);

Layout.propTypes = {
    menu: PropTypes.element.isRequired,
    children: PropTypes.element.isRequired,
    onScroll: PropTypes.func
};

export default Layout;
