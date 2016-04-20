import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';

const validate  = (values) => {
    const errors = {};

    if (!values.title) {
        errors.title = 'Title is required';
    }

    if(!values.description) {
        errors.description = 'Description is required';
    }

    return errors;
};

class CreateForm extends Component  {
    render() {
        const {fields: {title, description}, handleSubmit} = this.props;

        return (
            <section className="challenge-create">
                <form onSubmit={handleSubmit(() => {console.log('Submited!');})}>
                    <header className="challenge-create__header">
                        <h2>Create Challenge</h2>

                        <button className="challenge-create__discard">Discard</button>
                        <button className="challenge-create__post">Post</button>
                    </header>

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
                </form>
            </section>
        )
    }
};

CreateForm.propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired
};

export default reduxForm({
    form: 'create',
    fields: ['title', 'description'],
    validate,
    touchOnChange: true
})(CreateForm)