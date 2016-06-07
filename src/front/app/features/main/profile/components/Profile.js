import React, { Component, PropTypes } from 'react';
import { hashHistory } from 'react-router';
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
        if (!userId) {
            hashHistory.push('/');
        } else {
            getUser(userId);
            getChallenges(userId);
        }
    }

    render() {
        const { user } = this.props;

        return (
            <Layout menu={<ProfileScreenMenu />} >
                <div>
                    { user.size && <UserDetails user={user} /> }
                </div>
            </Layout>
        );
    }
}

Profile.propTypes = {
    user: ImmutablePropTypes.map,
    getUser: PropTypes.func.isRequired,
    getChallenges: PropTypes.func.isRequired,
    userId: PropTypes.string
};

export default Profile;
