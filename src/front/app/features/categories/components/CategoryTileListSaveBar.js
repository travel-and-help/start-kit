import React, { PropTypes } from 'react';

const CategoryListSaveBar = ({ onClickHandler }) => (
    <div
        className="category__save-btn"
        data-selector="save-categories-btn"
        onClick={ onClickHandler }
    >
        Great, let's go!
    </div>
);

CategoryListSaveBar.propTypes = {
    onClickHandler: PropTypes.func.isRequired
};

export default CategoryListSaveBar;
