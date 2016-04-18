import React from 'react';

const Menu = ({ active }) => {

    const menuClass = (active) ? 'challenges__menu_active' : 'challenges__menu';

    return (
        <div className={ menuClass }>
            <input className="challenges__search" type="text" placeholder="Search" />
        </div>
    );
};

Menu.propTypes = {
    active: React.PropTypes.bool
};

export default Menu;
