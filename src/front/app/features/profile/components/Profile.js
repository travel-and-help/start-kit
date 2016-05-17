import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import ImmutablePropTypes from 'react-immutable-proptypes';
import ChallengeList from '../../../common/components/challenge/ChallengeTileList';
import UserDetailsContainer from './UserDetails/UserDetailsContainer';
import SocialList from './Social/SocialList';
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
                <UserDetailsContainer user={user} />

                <section className="section-container" >
                    <h4 className="section-container__title" >LOCATIONS</h4>
                    <div className="section-container__description" >{user.locations}</div>
                </section>

                <section className="section-container" >
                    <h4 className="section-container__title" >CATEGORIES</h4>
                    <div className="section-container__description" >{user.categories}</div>
                </section>

                <section className="section-container section-container--inline" >
                    <h4 className="section-container__title" >ON WEB</h4>
                    <div className="section-container__description" >
                        <SocialList socials={user.socials} />
                    </div>
                </section>

                <section className="section-container" >
                    <div className="section-container__description" >
                        <p>
                            Member since {user.registerDate}
                        </p>
                        <p>
                            Last login {user.lastLogin}
                        </p>
                    </div>
                </section>

                <section className="section-container" >
                    <h4 className="section-container__title" >Created Challenges</h4>
                    <div className="section-container__description" >
                        <ChallengeList challenges={user.createdChallenges} />
                    </div>
                    <Link to="Challenges">
                        Show All
                    </Link>
                </section>

                <section className="section-container" >
                    <h4 className="section-container__title" >Completed Challenges</h4>
                    <div className="section-container__description" >
                        <ChallengeList challenges={user.completedChallenges} />
                    </div>
                    <Link to="Challenges">
                        Show All
                    </Link>
                </section>
            </div>
        );
    }
}

Profile.propTypes = {
    user: ImmutablePropTypes.map.isRequired,
    getUser: PropTypes.func.isRequired
};

export default Profile;
