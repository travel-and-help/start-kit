import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

const CreateCategories = ({ categories, category }) => {
    const categoriesArr = categories.toJS();
    const placeholder = 'Challange category';

    return (
        <div className={category.error && category.touched ?
          'create-category create-category_error' : 'create-category' }
        >

            <div className="create-category__value">
                {(category.value !== '') ? JSON.parse(category.value).name : placeholder}
            </div>

            <select className="create-category__select" {...category}>
                <option value="">{placeholder}</option>
                { categoriesArr && categoriesArr.map((cat, index) => (
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
