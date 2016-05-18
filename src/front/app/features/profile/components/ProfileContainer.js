import { connect } from 'react-redux';
import Profile from './Profile';
import { getUser } from '../profile.actions';

const mapStateToProps = ({ user }) => ({ user });

const mapDispatchToProps = (dispatch) => ({
    getUser: () => {
        dispatch(getUser());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
