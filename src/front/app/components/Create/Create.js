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

const EnabledCheckbox = ({ text }) => (
    <div className="challenge-create-enabled__title">
        {text}
        <div className="challenge-create-enabled__checkbox"><input type="checkbox" checked  enabled/></div>
    </div>
);

const DisabledCheckbox = ({ text }) => (
    <div className="challenge-create-disabled__title">
        {text}
        <div className="challenge-create-disabled__checkbox"><input type="checkbox" checked  disabled/></div>
    </div>
);

const CreateTitleBlock = ({ text }) => (
    <span className="challenge-create-titles">{text}</span>
);

const SetDay = ({ text }) => (
    <div className="challenge-create-day">
        <label className="challenge-create-enabled__title">
            {text}
            <input className="challenge-create-day-input" type="date" />
        </label>
    </div>
);


class CreateForm extends Component  {
    render() {
        const {fields: {title, description}, handleSubmit} = this.props;

        return (
            <section className="challenge-create">
                <form onSubmit={ handleSubmit(() => {console.log('Submited!');}) }>

                    <header className="challenge-create-header">
                        <span className="challenge-create-header__title">Create Challenge</span>

                        <button className="challenge-create-header__discard">Discard</button>
                        <button className="challenge-create-header__post">Post</button>
                    </header>

                    <div className="challenge-create__body">
                        <div className="challenge-create-main">
                        <div className="challenge-create-main__photo">
                            <button className="challenge-create-main__photo-download"></button>
                            <img className="challenge-create-main__image" src="" title="image" />
                        </div>

                        <input className="challenge-create-main__input" placeholder="Enter title" {...title} />
                        {title.touched && title.error && <div className="form-error">{title.error}</div>}
                        </div>

                        <div className = "challenge-create-basic">
                            <CreateTitleBlock text="basic" />
                            <span className="challenge-create-basic__address">
                                <img className="challenge-create-basic__img-address" src="" alt="img" />75 Zhylyanska St, Kyiv, Ukraine
                            </span>
                            <div className="challenge-create-disabled__title">Online
                                <div className="challenge-create-disabled__checkbox"><input type="checkbox" checked  disabled/></div>
                            </div>
                            
                                <div className="challenge-create-basic__description-title">Description</div>
                           <textarea placeholder="Tell Users about the background of the issue." className="challenge-create-basic__description"></textarea>
                          {description.touched && description.error && <div className="form-error">{description.error}</div>}
                        </div>

                    <div className="challenge-create-block">
                        <CreateTitleBlock text="Settings" />

                        <div className="challenge-create-select-title">
                            Category

                            <select className="challenge-create-select-block">
                                <option value="-1"> > </option>
                                <option>Category 1</option>
                                <option>Category 2</option>
                                <option>Category 3</option>
                            </select>
                        </div>
                        <EnabledCheckbox text="Repeateble" />
                        <DisabledCheckbox text="End date" />
                        <EnabledCheckbox text="Restrict Visibility" />

                        <SetDay text="Start Day"></SetDay>
                        <SetDay text="End Day"></SetDay>
                    </div>
                        <div className="challenge-create-block">
                        <CreateTitleBlock text="Requirements" />

                        <EnabledCheckbox text="Financial Recources" />
                        <DisabledCheckbox text="Special Skills" />
                        <DisabledCheckbox text="Spare Time" />

                        <div className="challenge-create-select-title">
                            Complexity level

                            <select className="challenge-create-select-block">
                                <option value="-1"> > </option>
                                <option>Low</option>
                                <option>Middle</option>
                                <option>Hight</option>
                            </select>


                        <EnabledCheckbox text="Verification" />
                         </div>
                        </div>
                        <div className="challenge-create-block">
                        <CreateTitleBlock text="" />
                        <EnabledCheckbox text="Invite Friends" />
                    </div>
                    </div>

                </form>
            </section>
        );
    }
}

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
