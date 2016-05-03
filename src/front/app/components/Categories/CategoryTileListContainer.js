import { connect } from 'react-redux';
import CategoryTileList from './CategoryTileList';
import { getCategories, toggleCategory } from './../../actions/categories';

const mapStateToProps = ({ categories }) => ({ categories });

const mapDispatchToProps = (dispatch) => ({
    getCategories: () => {
        dispatch(getCategories());
    },
    onCLick: (name) => {
        dispatch(toggleCategory(name));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryTileList);
