import { connect } from 'react-redux';
import CompleteChallenge from './CompleteChallenge';
import { completeChallenge } from '../../challenge.actions';
import { hashHistory } from 'react-router';

const mapStateToProps = ({ similarChallenges = [] }, { params: { id } }) =>
    ({ similarChallenges, id });

const mapDispatchToProps = dispatch => ({
    handleSubmit: (id, formData) => {
        dispatch(completeChallenge(id, formData));
    },

    goBack: () => {
        hashHistory.goBack();
    }

});

export default connect(mapStateToProps, mapDispatchToProps)(CompleteChallenge);
