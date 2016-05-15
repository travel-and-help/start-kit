import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

const CategoryTile = ({ onClick, category }) => {
    const onCategoryClick = () => onClick(category.get('name'));
    return (
        <li onClick={ onCategoryClick } >
            { category.get('name') }
        </li>
    );
};

CategoryTile.propTypes = {
    category: ImmutablePropTypes.mapContains({
        name: PropTypes.string.isRequired
    }).isRequired,
    onClick: PropTypes.func.isRequired
};

export default CategoryTile;
