import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import UserDetailsContainer from './UserDetails/UserDetailsContainer';
import Header from './Header';
import { getUser } from '../profile.actions';

class Profile extends Component {
    componentWillMount() {
        const { dispatch } = this.props;
        dispatch(getUser());
    }

    render() {
        const { user } = this.props;

        return (
            <div className="profile">
                <Header />
                {user.size && <UserDetailsContainer user={user} />}
            </div>
        );
    }
}

Profile.propTypes = {
    user: ImmutablePropTypes.map.isRequired,
    dispatch: PropTypes.func.isRequired
};

export default Profile;
