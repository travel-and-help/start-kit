import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import classNames from 'classnames';
import IconButton from './../../../common/components/buttons/IconButton';

const CategoryTile = ({ onClick, category }) => {
    const onCategoryClick = () => onClick(category.get('_id'));
    const buttonClasses = classNames({
        category__button_checked: category.get('checked') === true,
        category__button: true
    });

    return (
        <li className="category__item">
            <IconButton
              iconName={`category-${category.get('name').toLowerCase()}`}
              iconSize={48}
              iconClassName="icon_light"
              buttonClassName={ buttonClasses }
              clickHandler={ onCategoryClick }
            />
            {category.get('name')}
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
