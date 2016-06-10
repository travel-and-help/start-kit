import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

const CreateCategories = ({ categories, value, ...rest }) => {
    const categoriesArr = categories.toJS();
    const placeholder = 'Challenge category';
    const parseValue = (val, collection = []) => (
        collection
            .find((cat) => cat._id === val)
            .name
    );

    return (
        <div className={rest.error && rest.touched ?
          'create-category create-category_error' : 'create-category' }
        >
            <div className="create-category__value" >
                {value && parseValue(value, categoriesArr) || placeholder}
            </div>
            <select className="create-category__select"
                    value={value}
                {...rest}
            >
                <option value="" >{placeholder}</option>
                { categoriesArr && categoriesArr.map((cat, index) => (
                    <option value={cat._id} key={index} >
                        {cat.name}
                    </option>
                )) }
            </select>
        </div>
    );
};

CreateCategories.propTypes = {
    categories: ImmutablePropTypes.list.isRequired,
    category: PropTypes.object,
    rest: PropTypes.array,
    value: PropTypes.string
};

export default CreateCategories;
