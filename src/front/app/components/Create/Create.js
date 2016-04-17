import React from 'react';

export default () => (
    <div className="challenge-create__body">
        <div className="challenge-create__photo">
            <button className="challenge-create__photo-download">Download Image</button>
            <img className="challenge-create__image" src="" />
        </div>

        <input className="challenge-create__title" placeholder="Enter title" />

        <textarea className="challenge-create__description" placeholder="Enter description"></textarea>

        <h3 className="challenge-create__subtitle">Settings</h3>

        <label className="challenge-create__field">
            Category
            <select>
                <option value="-1">Select</option>
                <option>Category 1</option>
                <option>Category 2</option>
                <option>Category 3</option>
            </select>
        </label>

        <label className="challenge-create__field">
            Repeateble
            <input type="checkbox" checked  disabled/>
        </label>

        <label className="challenge-create__field">
            Start Date
            <input type="date" />
        </label>

        <label className="challenge-create__field">
            End Date
            <input type="date" />
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
