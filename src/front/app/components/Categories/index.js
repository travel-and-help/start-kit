import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getCategories, toggleCategory } from './../../actions/categories';
import Category from './Category';

class CategoryList extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(getCategories());
    }

    handleClick(name) {
        const { dispatch } = this.props;

        dispatch(toggleCategory(name));
    }

    render() {
        const { categories } = this.props;

        return (
            <ul>
                {categories.map((category, index) => (
                    <Category
                      key={index}
                      {...category}
                      onClickHandler={() => {this.handleClick(category.name);}}
                    />
                ))}
            </ul>
        );
    }
}

CategoryList.propTypes = {
    categories: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired
    }).isRequired).isRequired,
    dispatch: PropTypes.func.isRequired
};

const mapStateToProps = ({ categories }) => ({ categories });

export default connect(mapStateToProps)(CategoryList);
