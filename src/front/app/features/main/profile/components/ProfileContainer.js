import { connect } from 'react-redux';
import { getUser } from '../profile.actions';
import Profile from './Profile';

const mapStateToProps = ({ user }) => {
    const userId = '574e979e8577266100429bdb';
    return {
        userId,
        user
    };
};

const mapDispatchToProps = (dispatch) => ({
    getUser: (id) => {
        dispatch(getUser(id));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
