import React, { PropTypes } from 'react';
import CreateCategories from './CreateCategories';
import ImmutablePropTypes from 'react-immutable-proptypes';
import CreateFormError from './CreateFormError';

const levels = ['low', 'middle', 'hight'];

const CreateFormBody = ({ fields, categories }) => (
    <div className="challenge-create__body">
        <div className="challenge-create__photo">
<input type="file" className="challenge-create__photo-download" {...fields.image} value={ null } />
            <img className="challenge-create__image" src="" />
        </div>

        <input className="challenge-create__input" placeholder="Enter title" {...fields.title} />
        {fields.title.touched &&
        fields.title.error &&
        <CreateFormError message={fields.title.error} />}

        <div className="challenge-create__septa"></div>
        <div className="challenge-create__description-title">Description</div>
        <hr />

<textarea className="challenge-create__descr" placeholder="Description" {...fields.description} >
</textarea>

        {fields.description.touched && fields.description.error &&
        <CreateFormError message={fields.description.error} />}

        <div className="challenge-create__titles">Settings</div>

        <CreateCategories categories={categories} category={fields.category} />

        <div className="challenge-create__field">
            <input type="checkbox" className="challenge-create__checkbox" />
            <label className="challenge-create__checkbox-title">Repeateble</label>
        </div>

        <label className="challenge-create__field">
            Start Date
            <input className="challenge-create__day-input" type="date" />
        </label>

        <label className="challenge-create__field">
            End Date
            <input className="challenge-create__day-input" type="date" />
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

            <select {...fields.level}>
                <option>Select level</option>

                {levels.map((levelOption) =>
                    (<option value={levelOption} key={levelOption}>{levelOption}</option>))
                }
            </select>

            {fields.level.touched &&
            fields.level.error &&
            <CreateFormError message={fields.level.error} />}

        </label>

        <div className="challenge-create__field">
            <input type="checkbox" className="challenge-create__checkbox" />
            <label className="challenge-create__checkbox-title">Verification</label>
        </div>
    </div>
);


CreateFormBody.propTypes = {
    fields: PropTypes.object.isRequired,
    categories: ImmutablePropTypes.list.isRequired
};

export default CreateFormBody;
