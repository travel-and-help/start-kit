import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const CategoryListSaveBar = ({ onClickHandler }) => (
    <div>
        <Link to="challenges">
            X
        </Link>
        <div>Topics to watch</div>
        <Link to="challenges" onClick={ onClickHandler }>
            V
        </Link>
    </div>
);

CategoryListSaveBar.propTypes = {
    onClickHandler: PropTypes.func.isRequired
};

export default CategoryListSaveBar;
