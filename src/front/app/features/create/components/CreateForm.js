import React, { Component, PropTypes } from 'react';
import { fromJS } from 'immutable';
import FormHeader from '../../../common/components/create/FormHeader';
import CreateFormBody from './CreateFormBody';
import ImmutablePropTypes from 'react-immutable-proptypes';

class CreateForm extends Component {
    componentDidMount() {
        const {
            categories,
            user,
            getCategories,
            getChallenge,
            goToLogin,
            challengeId
        } = this.props;
        if (!user) {
            goToLogin();
        }
        if (categories.size === 0) {
            getCategories();
        }
        if (challengeId) {
            getChallenge(challengeId);
        }
    }

    componentWillUnmount() {
        this.props.resetState();
    }

    render() {
        const {
            fields,
            handleSubmit,
            updateChallenge,
            postChallenge,
            categories,
            headerTitle,
            challenge
        } = this.props;

        const extendPostChallenge = (data) => {
            if (challenge && challenge.size) {
                const ignoredFields = ['user', '_id'];
                const immutableData = fromJS(data);
                const formData = immutableData
                    .filter((value, key) => ignoredFields.indexOf(key) === -1)
                    .filter((value, key) => (challenge.get(key) && (challenge.get(key) !== value)));
                updateChallenge(formData, challenge.get('_id'));
            } else {
                const formData = data;
                formData.categories = [data.category];
                formData.location = 'Kyiv';
                formData.level = 'easy';

                postChallenge(formData);
            }
        };

        return (
            <form onSubmit={ handleSubmit(extendPostChallenge) } >
                <FormHeader headerTitle={headerTitle} />
                <CreateFormBody fields={fields} categories={categories} />
            </form>
        );
    }
}

CreateForm.propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    getCategories: PropTypes.func.isRequired,
    postChallenge: PropTypes.func.isRequired,
    getChallenge: PropTypes.func.isRequired,
    updateChallenge: PropTypes.func.isRequired,
    resetState: PropTypes.func.isRequired,
    goToLogin: PropTypes.func.isRequired,
    categories: ImmutablePropTypes.list.isRequired,
    challenge: ImmutablePropTypes.map,
    challengeId: PropTypes.string,
    headerTitle: PropTypes.string,
    user: PropTypes.string
};

export default CreateForm;
