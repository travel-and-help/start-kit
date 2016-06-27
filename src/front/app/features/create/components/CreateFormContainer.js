import { push } from 'react-router-redux';
import { reduxForm } from 'redux-form';
import loadable from '../../../common/components/loadable';
import validate from './validate';
import CreateForm from './CreateForm';
import { fetchCategories, sendChallenge } from '../create.actions';
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
        categories,
        initialValues,
        user,
        challenge
    };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
    const innerSendChallenge = sendChallenge(stateProps.challenge);
    const { challengeId } = ownProps;
    const { dispatch } = dispatchProps;
    return {
        ...ownProps,
        ...stateProps,
        ...dispatchProps,
        sendChallenge: (data) => {
            dispatch(innerSendChallenge(data));
        },
        onLoad() {
            if (!stateProps.user) {
                dispatch(push('/'));
                return;
            }
            dispatch(fetchCategories());
            if (challengeId) {
                dispatch(fetchChallenge(challengeId));
            }
        },
        resetState
    };

};

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
    null,
    mergeProps
)(loadable(CreateForm));

