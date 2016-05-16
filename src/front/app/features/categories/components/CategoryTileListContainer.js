import { connect } from 'react-redux';
import CategoryTileList from './CategoryTileList';
import { getCategories, watchCategory, saveCategories } from '../categories.actions';

const mapStateToProps = ({ categories }) => ({ categories });

const mapDispatchToProps = (dispatch) => ({
    getCategories: () => {
        dispatch(getCategories());
    },
    onCategoryClick: (category) => {
        dispatch(watchCategory(category));
    },
    onSaveCategoryClick: (categories) => {
        dispatch(saveCategories(categories.filter((category) => category.get('checked') === true)));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryTileList);
