import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { hashHistory } from 'react-router';
import { fromJS } from 'immutable';
import CreateFormBody from './CreateFormBody';
import { fetchChallenge } from '../../challenge/challenge.actions';
import validate from './validate';
import ImmutablePropTypes from 'react-immutable-proptypes';

class CreateForm extends Component {
    componentDidMount() {
        const {
            categories,
            user,
            getCategories,
            getChallenge } = this.props;
        const challengeId = this.props.challengeId;
        if (!user) {
            hashHistory.push('/');
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
            challenge
        } = this.props;

        const extendPostChallenge = (data) => {
            if (challenge) {
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
    categories: ImmutablePropTypes.list.isRequired,
    challenge: ImmutablePropTypes.map,
    challengeId: PropTypes.string,
    user: PropTypes.string
};

const mapStateToProps = ({ challenge, auth }) => {
    const { categories } = challenge.toJS();
    const initialValues = {
        ...challenge.toJS(),
        category: categories && categories[0],
        user: auth.get('userId')
    };
    return { initialValues };

};
const mapDispatchToProps = (dispatch) => (
    {
        getChallenge: (id) => {
            dispatch(fetchChallenge(id));
        }
    }
);

export default reduxForm(
    {
        form: 'create',
        fields: [
            'title',
            'description',
            'category',
            'startDate',
            'endDate',
            'repeateble',
            'proof',
            'user',
            'image'
        ],
        validate
    },
    mapStateToProps,
    mapDispatchToProps
)(CreateForm);
