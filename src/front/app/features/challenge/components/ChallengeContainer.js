import { connect } from 'react-redux';
import { fetchChallenge } from '../challenge.actions';
import Challenge from './Challenge';

const mapStateToProps = ({ challenge }) => ({ challenge });

const mapDispatchToProps = (dispatch) => ({
    getChallenge: (id) => {
        dispatch(fetchChallenge(id));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Challenge);
