import React from 'react';

/* istanbul ignore next */
const Menu = ({ className, leftAction, rightAction, title }) => (
    <div className={`${className} menu`} >
        <div className="menu__action" >
            {leftAction}
        </div>

        <div className="menu__title" >
            {title}
        </div>

        <div className="menu__action" >
            {rightAction}
        </div>
    </div>
);

Menu.propTypes = {
    className: React.PropTypes.string,
    leftAction: React.PropTypes.element,
    rightAction: React.PropTypes.element,
    title: React.PropTypes.string
};

export default Menu;
