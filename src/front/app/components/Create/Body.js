import React, { PropTypes } from 'react';
import Category from './category';

const categories = [
    { name: 'Category 1213'},
    { name: 'Category 2'},
    { name: 'Category 3'},
    { name: 'Category 4'}
];

const Body = ({title, description}) => (
    <div className="challenge-create__body">
        <div className="challenge-create__photo">
            <button className="challenge-create__photo-download">Download Image</button>
            <img className="challenge-create__image" src="" />
        </div>

        <input className="challenge-create__title" placeholder="Enter title" {...title} />
                        {title.touched && title.error && <div className="form-error">{title.error}</div>}

        <textarea className="challenge-create__description" placeholder="Enter description" {...description}></textarea>
                        {description.touched && description.error && <div className="form-error">{description.error}</div>}


        <h3 className="challenge-create__subtitle">Settings</h3>

        <Category categories={categories} />

        <label className="challenge-create__field">
        Repeateble
            <input type="checkbox" checked  disabled/>
        </label>

        <label className="challenge-create__field">
        Start Date
            <input type="date"/>
        </label>

        <label className="challenge-create__field">
        End Date
            <input type="date"/>
        </label>

        <label className="challenge-create__field">
        Special skills

            <input type="checkbox"/>
        </label>

        <label className="challenge-create__field">
        Spare time

            <input type="checkbox"/>
        </label>

        <label className="challenge-create__field">
        Complexity level

            <select>
                <option value="-1">Select</option>
                <option>Low</option>
                <option>Middle</option>
                <option>Hight</option>
            </select>
        </label>

        <label className="challenge-create__field">
        Verification

            <input type="checkbox"/>
        </label>
    </div>
);


Body.propTypes = {
    title: PropTypes.object,
    description: PropTypes.object
};


export default Body;
