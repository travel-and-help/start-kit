import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

const CreateCategories = ({ categories }) => (
    <label className="challenge-create__field">
        Category

        <select className="challenge-create__select-type">
            <option value="-1"> > </option>
            {categories.map((category, index) => (
                <option value={category.name} key={index}>{category.name}</option>
            ))}
        </select>
    </label>
);

CreateCategories.propTypes = {
    categories: ImmutablePropTypes.list.isRequired
};


export default CreateCategories;
