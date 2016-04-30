import React, { PropTypes } from 'react';

const Category = ({ onClickHandler, name }) => (
    <li onClick={onClickHandler}>
        {name}
    </li>
);

Category.propTypes = {
    name: PropTypes.string.isRequired,
    onClickHandler: PropTypes.func.isRequired
};

export default Category;
