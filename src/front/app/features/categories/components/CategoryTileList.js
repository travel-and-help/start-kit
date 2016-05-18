import React, { Component, PropTypes } from 'react';
import CategoryTile from './CategoryTile';
import ImmutablePropTypes from 'react-immutable-proptypes';

class CategoryTileList extends Component {
    componentDidMount() {
        this.props.getCategories();
    }

    render() {
        const { categories, onCategoryClick } = this.props;

        return (
            <ul>
                {categories.map((category, index) => (
                    <CategoryTile
                      key={index}
                      category={category}
                      onClick={ onCategoryClick }
                    />
                ))}
            </ul>
        );
    }
}

CategoryTileList.propTypes = {
    categories: ImmutablePropTypes.list.isRequired,
    getCategories: PropTypes.func.isRequired,
    onCategoryClick: PropTypes.func.isRequired
};

export default CategoryTileList;
