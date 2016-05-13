import { connect } from 'react-redux';
import CreateForm from './CreateForm';
import { fetchCategories, postChallenge } from '../create.actions';

const mapStateToProps = ({ categories }) => ({ categories });

const mapDispatchToProps = (dispatch) => ({
    getCategories: () => {
        dispatch(fetchCategories());
    },
    postChallenge: (challenge) => {
        dispatch(postChallenge(challenge));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateForm);

