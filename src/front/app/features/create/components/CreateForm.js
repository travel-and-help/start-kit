import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import CreateFormHeader from './CreateFormHeader';
import CreateFormBody from './CreateFormBody';
import validate from './validate';
import ImmutablePropTypes from 'react-immutable-proptypes';


class CreateForm extends Component {
    componentDidMount() {
        if (this.props.categories.size === 0) {
            this.props.getCategories();
        }
    }

    render() {
        const { fields, handleSubmit, postChallenge, categories, user } = this.props;

        const extendPostChallenge = (data) => {
            const formData = data;
            formData.user = user;
            formData.categories = [JSON.parse(data.category)._id];

            // TODO: remove after demo #2
            formData.location = 'Kyiv';
            formData.image = 'http://placekitten.com/400/400';
            formData.level = 'easy';

            postChallenge(formData);
        };

        return (
            <section className="challenge-create">
                <form onSubmit={ handleSubmit(extendPostChallenge) }>
                    <CreateFormHeader />
                    <CreateFormBody fields={fields} categories={categories} />
                </form>
            </section>
        );
    }
}

CreateForm.propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    getCategories: PropTypes.func.isRequired,
    postChallenge: PropTypes.func.isRequired,
    categories: ImmutablePropTypes.list.isRequired,
    user: PropTypes.string.isRequired
};

export default reduxForm({
    form: 'create',
    fields: [
        'title',
        'description',
        'category',
        'startDate',
        'endDate',
        'repeateble',
        'proof',
        'user'
    ],
    validate
})(CreateForm);
