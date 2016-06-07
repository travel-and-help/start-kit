import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import UserDetails from './UserDetails/UserDetails';
import Layout from '../../../Layout';
import ProfileScreenMenu from './ProfileScreenMenu';


class Profile extends Component {
    componentDidMount() {
        const {
            getUser,
            getChallenges,
            userId } = this.props;
        getUser(userId);
        getChallenges(userId);
    }

    render() {
        const { user, challenges } = this.props;

        return (
            <Layout menu={<ProfileScreenMenu />} >
                {user.size && <UserDetails user={user} challenges={challenges} />}
            </Layout>
        );
    }
}

Profile.propTypes = {
    user: ImmutablePropTypes.map.isRequired,
    challenges: ImmutablePropTypes.list.isRequired,
    getUser: PropTypes.func.isRequired,
    getChallenges: PropTypes.func.isRequired,
    userId: PropTypes.string.isRequired
};

export default Profile;
