import React from 'react';

const CreateCategories = ({categories}) => (
    <label className="challenge-create__field">
        Category

        <select>
            <option value="-1">Select</option>
            {categories.map((category, index) => (
                <option value={category.name} key={index}>{category.name}</option>
            ))}
        </select>
    </label>
);


export default CreateCategories;
