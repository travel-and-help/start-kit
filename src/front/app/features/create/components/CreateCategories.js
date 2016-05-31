import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

const CreateCategories = ({ categories, category }) => {
    const categoriesArr = categories.toJS();

    return (
        <label className="create-category">
            <select className={category.error && category.touched ?
                'create-category__select create-category__select_error' :
                'create-category__select' } {...category}
            >

                <option value="-1">Challange category</option>
                { categoriesArr.map((cat, index) => (
                    <option value={JSON.stringify(cat)} key={index}>{cat.name}</option>
                )) }
            </select>
        </label>
    );
};

CreateCategories.propTypes = {
    categories: ImmutablePropTypes.list.isRequired,
    category: PropTypes.object
};


export default CreateCategories;
