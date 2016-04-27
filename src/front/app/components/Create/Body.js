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
            <button className="challenge-create__photo-download">Download</button>
            <img className="challenge-create__image" src="" />
        </div>

        <input className="challenge-create__input" placeholder="Enter title" {...title} />
                        {title.touched && title.error && <div className="form-error">{title.error}</div>}

        <div className="challenge-create__septa"></div>
        <div className="challenge-create__description-title">Description</div>
        <hr/>
        <textarea className="challenge-create__description" placeholder="Enter description" {...description}></textarea>
                        {description.touched && description.error && <div className="form-error">{description.error}</div>}



        <div className="challenge-create__titles">Settings</div>

        <Category categories={categories} />

        <div className="challenge-create__field">
            <input type="checkbox" className="challenge-create__checkbox" />
            <label className="challenge-create__checkbox-title">Repeateble</label>
        </div>

        <label className="challenge-create__field">
        Start Date
            <input className="challenge-create__day-input" type="date"/>
        </label>

        <label className="challenge-create__field">
        End Date
            <input className="challenge-create__day-input" type="date"/>
        </label>
        <div className="challenge-create__titles">Requirements</div>

        <div className="challenge-create__field">
            <input type="checkbox" className="challenge-create__checkbox" />
            <label className="challenge-create__checkbox-title">Special skills</label>
        </div>

        <div className="challenge-create__field">
            <input type="checkbox" className="challenge-create__checkbox" />
            <label className="challenge-create__checkbox-title">Spare time</label>
        </div>

        <label className="challenge-create__field">
        Complexity level

            <select className="challenge-create__select-type">
                <option value="-1"> > </option>
                <option>Low</option>
                <option>Middle</option>
                <option>Hight</option>
            </select>
        </label>

        <div className="challenge-create__field">
            <input type="checkbox" className="challenge-create__checkbox" />
            <label className="challenge-create__checkbox-title">Verification</label>
        </div>
    </div>
);


Body.propTypes = {
    title: PropTypes.object,
    description: PropTypes.object
};


export default Body;
