import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import classNames from 'classnames';

const CategoryTile = ({ onClick, category }) => {
    const onCategoryClick = () => onClick(category.get('_id'));
    const classes = classNames({
        checked: category.get('checked') === true
    });

    return (
        <li className={ classes } onClick={ onCategoryClick } >
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
