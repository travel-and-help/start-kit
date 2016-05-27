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
        const { fields, handleSubmit, postChallenge, categories } = this.props;

        return (
            <section className="challenge-create">
                <form onSubmit={ handleSubmit(postChallenge) }>
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
    categories: ImmutablePropTypes.list.isRequired
};

export default reduxForm({
    form: 'create',
    fields: ['title', 'description', 'level', 'category', 'image'],
    validate
})(CreateForm);
