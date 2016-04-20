import React from 'react';

const Menu = ({ menuClass }) => (
    <div className={ menuClass }>
        <input className="challenges__search" type="text" placeholder="Search" />
    </div>
);

Menu.propTypes = {
    menuClass: React.PropTypes.string
};

export default Menu;
