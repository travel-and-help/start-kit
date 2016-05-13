import React from 'react';
import { Router } from 'react-router';
import { connect } from 'react-redux';
import Header from './Header';
import Socials from './Socials';
import UserDetails from './UserDetails';
import Challenges from '../Challenges';
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
            <div className="profile" >
                <Header />
                <UserDetails user={user} />

                <section className='section-container' >
                    <h4 className='section-container__title' >LOCATIONS</h4>
                    <div className='section-container__description' >{user.locations}</div>
                </section>

                <section className='section-container' >
                    <h4 className='section-container__title' >CATEGORIES</h4>
                    <div className='section-container__description' >{user.categories}</div>
                </section>

                <section className='section-container section-container--inline' >
                    <h4 className='section-container__title' >ON WEB</h4>
                    <div className='section-container__description' >
                        <Socials socials={user.socials} />
                    </div>
                </section>

                <section className='section-container' >
                    <div className='section-container__description' >
                        <p>
                            Member since {user.registerDate}
                        </p>
                        <p>
                            Last login {user.lastLogin}
                        </p>
                    </div>
                </section>

                <section className='section-container' >
                    <h4 className='section-container__title' >Created Challenges</h4>
                    <div className='section-container__description' >
                        <Challenges/>
                    </div>
                    <Link to='Challenges'>
                        Show All
                    </Link>
                </section>

                <section className='section-container' >
                    <h4 className='section-container__title' >Completed Challenges</h4>
                    <div className='section-container__description' >
                        <Challenges/>
                    </div>
                    <Link to='Challenges'>
                        Show All
                    </Link>
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
