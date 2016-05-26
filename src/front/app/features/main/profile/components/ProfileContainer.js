import { connect } from 'react-redux';
import { getUser } from '../profile.actions';
import Profile from './Profile';

const mapStateToProps = ({ user }) => ({ user });

const mapDispatchToProps = (dispatch) => ({
    getUser: () => {
        dispatch(getUser());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
