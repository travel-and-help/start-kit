import React from 'react';
import { Router } from 'react-router';
import { connect } from 'react-redux';
import Header from './Header';
import Socials from './Socials';
import UserDetails from './UserDetails';
import { getUser } from './../../actions/user';

class Profile extends React.Component {
    constructor(props) {
        super(props);

        const { user } = props;
        const { dispatch } = props;

        dispatch(getUser());
    }

    render() {
        const { user } = this.props || {};

        return (
            <div class="profile" >
                <Header />
                <UserDetails user={user} />

                <section class='section-container' >
                    <h4 class='section-container__title' >LOCATIONS</h4>
                    <div class='section-container__description' >{user.locations}</div>
                </section>

                <section class='section-container' >
                    <h4 class='section-container__title' >CATEGORIES</h4>
                    <div class='section-container__description' >{user.categories}</div>
                </section>

                <section class='section-container section-container--inline' >
                    <h4 class='section-container__title' >ON WEB</h4>
                    <div class='section-container__description' >
                        <Socials socials={user.socials} />
                    </div>
                </section>

                <section class='section-container' >
                    <div class='section-container__description' >
                        <p>
                            Member since {user.registerDate}
                        </p>
                        <p>
                            Last login {user.lastLogin}
                        </p>
                    </div>
                </section>
            </div>
        );
    }
}

Profile.propTypes = {
    user: React.PropTypes.object,
    dispatch: React.PropTypes.func
};

const mapStateToProps = ({ user }) => ({ user });

export default connect(mapStateToProps)(Profile);
