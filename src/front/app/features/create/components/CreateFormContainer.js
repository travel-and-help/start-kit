import { connect } from 'react-redux';
import CreateForm from './CreateForm';
import { fetchCategories, postChallenge, updateChallenge } from '../create.actions';
import { resetState } from '../../challenge/challenge.actions';

const mapStateToProps = ({ categories, auth, challenge }) => (
    {
        challenge,
        categories,
        user: auth.get('userId')
    }
);

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
    resetState
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateForm);

