import React, { Component, PropTypes } from 'react';
import CategoryTile from './CategoryTile';
import CategoryTileListSaveBar from './CategoryTileListSaveBar';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Layout from './../../Layout';
import Menu from './../../Menu';

class CategoryTileList extends Component {
    componentDidMount() {
        this.props.getCategories();
    }

    render() {
        const { categories, onCategoryClick, onSaveCategoryClick } = this.props;
        const menu = (
            <Menu
                className="category__menu menu_light"
                title="Tap areas of interests"
            />
        );

        return (
            <Layout
                menu={menu}
            >
                <div>
                    <ul className="category__list">
                        {categories.map((category, index) => (
                            <CategoryTile
                                key={ index }
                                category={ category }
                                onClick={ onCategoryClick }
                            />
                        ))}
                    </ul>
                    <CategoryTileListSaveBar
                        onClickHandler={() => onSaveCategoryClick(this.props.categories)}
                    />
                </div>
            </Layout>
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
