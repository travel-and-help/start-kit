import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

class Profile extends Component {
    componentDidMount() {
        this.props.getUser();
    }

    render() {
        const { user } = this.props;

        console.log(user);
    }
}

Profile.propTypes = {
    user: ImmutablePropTypes.object.isRequired,
    getUser: PropTypes.func.isRequired
};

export default Profile;
