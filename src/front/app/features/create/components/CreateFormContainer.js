import { push } from 'react-router-redux';
import { reduxForm } from 'redux-form';
import validate from './validate';
import CreateForm from './CreateForm';
import { fetchCategories, postChallenge, updateChallenge } from '../create.actions';
import { resetState, fetchChallenge } from '../../challenge/challenge.actions';

const mapStateToProps = ({ categories, auth, challenge }) => {
    const challengeCategories = challenge.toJS().categories;
    const user = auth.get('userId');
    const initialValues = {
        ...challenge.toJS(),
        category: challengeCategories && challengeCategories[0],
        user
    };
    return {
        challenge,
        categories,
        initialValues,
        user
    };
};

const mapDispatchToProps = (dispatch) => ({
    getCategories: () => {
        dispatch(fetchCategories());
    },
    postChallenge: (challenge) => {
        dispatch(postChallenge(challenge));
    },
    updateChallenge: (data, id) => {
        dispatch(updateChallenge(data, id));
    },
    getChallenge: (id) => {
        dispatch(fetchChallenge(id));
    },
    goToLogin: () => dispatch(push('/')),
    resetState
});

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

