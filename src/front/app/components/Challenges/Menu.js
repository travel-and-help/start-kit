import React from 'react';

const Menu = ({ active }) => (
    <div className={ (active) ? 'challenges__menu_active' : 'challenges__menu' }>
        <input className="challenges__search" type="text" placeholder="Search" />
    </div>
);

Menu.propTypes = {
    active: React.PropTypes.bool.isRequired
};

export default Menu;
