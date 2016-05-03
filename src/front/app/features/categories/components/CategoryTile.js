import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

const CategoryTile = ({ onCLick, category }) => (
    <li onClick={ onCLick } >
        { category.get('name') }
    </li>
);

CategoryTile.propTypes = {
    category: ImmutablePropTypes.mapContains({
        name: PropTypes.string.isRequired
    }).isRequired,
    onCLick: PropTypes.func.isRequired
};

export default CategoryTile;
