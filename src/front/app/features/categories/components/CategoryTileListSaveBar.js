import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const CategoryListSaveBar = ({ onClickHandler }) => (
    <div>
        <Link to="challenges">
            X
        </Link>
        <div>Topics to watch</div>
        <div data-selector="save-categories-btn" onClick={ onClickHandler }>
            V
        </div>
    </div>
);

CategoryListSaveBar.propTypes = {
    onClickHandler: PropTypes.func.isRequired
};

export default CategoryListSaveBar;
