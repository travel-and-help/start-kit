import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

const CreateCategories = ({ categories, category }) => {
    const categoriesArr = categories.toJS();
    const placeholder = 'Challange category';

    return (
        <div className="create-category">
            <div className="create-category__value">
                {(category.value !== '') ? JSON.parse(category.value).name : placeholder}
            </div>

            <select className={category.error && category.touched ?
                'create-category__select create-category__select_error' :
                'create-category__select' } {...category}
            >

                <option value="-1">{placeholder}</option>
                { categoriesArr.map((cat, index) => (
                    <option value={JSON.stringify(cat)} key={index}>{cat.name}</option>
                )) }
            </select>
        </div>
    );
};

CreateCategories.propTypes = {
    categories: ImmutablePropTypes.list.isRequired,
    category: PropTypes.object
};


export default CreateCategories;
