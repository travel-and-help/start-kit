import { connect } from 'react-redux';
import { fetchChallenge, resetState } from '../challenge.actions';
import Challenge from './Challenge';

const mapStateToProps = ({ challenge }) => ({ challenge });

const mapDispatchToProps = (dispatch) => ({
    getChallenge: (id) => {
        dispatch(fetchChallenge(id));
    },
    getInitialState: () => {
        dispatch(resetState());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Challenge);
