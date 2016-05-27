import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

const CreateCategories = ({ categories, category }) => {
    const categoriesArr = categories.toJS();

    return (
        <label className="challenge-create__field">
            Category

            <select className="challenge-create__select-type" {...category}>
                <option>Select</option>
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
