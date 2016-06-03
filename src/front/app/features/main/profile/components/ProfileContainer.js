import { connect } from 'react-redux';
import { getUser, getChallenges } from '../profile.actions';
import Profile from './Profile';

const mapStateToProps = ({ user, auth }) => (
    {
        userId: auth.userId,
        user
    }
);

const mapDispatchToProps = (dispatch) => ({
    getUser: (id) => {
        dispatch(getUser(id));
    },
    getChallenges: (id) => {
        dispatch(getChallenges(id));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
