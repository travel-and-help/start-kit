import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import Layout from '../../Layout';
import CreateChallengeMenu from './CreateChallengeMenu';
import CreateChallengeForm from './CreateChallengeForm';
import validate from './validate';
import ImmutablePropTypes from 'react-immutable-proptypes';

class CreateChallengeScreen extends Component {
    componentDidMount() {
        if (this.props.categories.size === 0) {
            this.props.getCategories();
        }
    }

    render() {
        const { fields, handleSubmit, postChallenge, categories } = this.props;

        return (
            <form
                className="challenge-create"
                onSubmit={ handleSubmit(postChallenge) }
            >
                <Layout menu={<CreateChallengeMenu />} >
                    <CreateChallengeForm
                        fields={fields}
                        categories={categories}
                    />
                </Layout>
            </form>
        );
    }
}

CreateChallengeScreen.propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    getCategories: PropTypes.func.isRequired,
    postChallenge: PropTypes.func.isRequired,
    categories: ImmutablePropTypes.list.isRequired
};

export default reduxForm({
    form: 'create',
    fields: ['title', 'description', 'category', 'startDate', 'endDate', 'repeateble', 'proof'],
    validate
})(CreateChallengeScreen);
