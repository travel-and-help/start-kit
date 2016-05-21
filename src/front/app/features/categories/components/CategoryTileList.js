import React, { Component, PropTypes } from 'react';
import CategoryTile from './CategoryTile';
import CategoryTileListSaveBar from './CategoryTileListSaveBar';
import ImmutablePropTypes from 'react-immutable-proptypes';

class CategoryTileList extends Component {
    componentDidMount() {
        this.props.getCategories();
    }   

    render() {
        const { categories, onCategoryClick, onSaveCategoryClick } = this.props;

        return (
            <div>
                <CategoryTileListSaveBar
                  onClickHandler={() => onSaveCategoryClick(this.props.categories)}
                />
                <ul>
                    {categories.map((category, index) => (
                        <CategoryTile
                          key={ index }
                          category={ category }
                          onClick={ onCategoryClick }
                        />
                    ))}
                </ul>
            </div>
        );
    }
}

CategoryTileList.propTypes = {
    categories: ImmutablePropTypes.list.isRequired,
    getCategories: PropTypes.func.isRequired,
    onCategoryClick: PropTypes.func.isRequired,
    onSaveCategoryClick: PropTypes.func.isRequired
};

export default CategoryTileList;
