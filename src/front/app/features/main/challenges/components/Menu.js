import React, { PropTypes } from 'react';

// TODO make reusable for different searches, move to common
const Menu = ({ active }) => (
    <div className={ (active) ? 'challenges__menu_active' : 'challenges__menu' } >
        <input className="challenges__search" type="text" placeholder="Search" />
    </div>
);

Menu.propTypes = {
    active: PropTypes.bool.isRequired
};

export default Menu;
