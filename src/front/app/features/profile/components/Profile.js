import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import UserDetails from './UserDetails/UserDetails';
import Header from './Header';

class Profile extends Component {
    componentDidMount() {
        this.props.getUser();
    }

    render() {
        const { user } = this.props;

        return (
            <div className="profile">
                <Header />
                {user.size && <UserDetails user={user} />}
            </div>
        );
    }
}

Profile.propTypes = {
    user: ImmutablePropTypes.map.isRequired,
    getUser: PropTypes.func.isRequired
};

export default Profile;
