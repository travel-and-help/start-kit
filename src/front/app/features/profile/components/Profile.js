import React, { Component, PropTypes } from 'react';
import { fromJS } from 'immutable';
//  import { Link } from 'react-router';
import ImmutablePropTypes from 'react-immutable-proptypes';
//  import ChallengeList from '../../../common/components/challenge/ChallengeTileList';
import UserDetailsContainer from './UserDetails/UserDetailsContainer';
//  import SocialList from './Social/SocialList';
//  import Header from './Header';


class Profile extends Component {
    componentDidMount() {
        this.props.getUser();
    }

    render() {
        //  const { user } = this.props;
        const user = fromJS({
            _id: '5729c5b0a5cea55c0ec86180',
            photo: 'https://dl.dropboxusercontent.com/u/18882037/challenge/random/p10.jpg',
            registerDate: 1462355376059,
            lastLogin: 1462355376059,
            wishList: [],
            challenges: [
                {
                    status: 'accepted',
                    challenge: '57221b865604d7a415be6a5e'
                }
            ],
            location: 'Pechersk',
            firstName: 'Anton',
            lastName: 'Golubev',
            rating: 9
        });
        //  <Header />

        //
        //    <section className="section-container" >
        //        <h4 className="section-container__title" >LOCATIONS</h4>
        //        <div className="section-container__description" >{user.locations}</div>
        //    </section>
        //
        //    <section className="section-container" >
        //        <h4 className="section-container__title" >CATEGORIES</h4>
        //        <div className="section-container__description" >{user.categories}</div>
        //    </section>
        //
        //    <section className="section-container section-container--inline" >
        //        <h4 className="section-container__title" >ON WEB</h4>
        //        <div className="section-container__description" >
        //            <SocialList socials={user.socials} />
        //        </div>
        //    </section>
        //
        //    <section className="section-container" >
        //        <div className="section-container__description" >
        //            <p>
        //                Member since {user.registerDate}
        //            </p>
        //            <p>
        //                Last login {user.lastLogin}
        //            </p>
        //        </div>
        //    </section>
        //
        //    <section className="section-container" >
        //        <h4 className="section-container__title" >Created Challenges</h4>
        //        <div className="section-container__description" >
        //            <ChallengeList challenges={user.createdChallenges} />
        //        </div>
        //        <Link to="Challenges">
        //            Show All
        //        </Link>
        //    </section>
        //
        //    <section className="section-container" >
        //        <h4 className="section-container__title" >Completed Challenges</h4>
        //        <div className="section-container__description" >
        //            <ChallengeList challenges={user.completedChallenges} />
        //        </div>
        //        <Link to="Challenges">
        //            Show All
        //        </Link>
        //    </section>

        return (
            <div className="profile">
                <UserDetailsContainer user={user} />
            </div>
        );
    }
}

Profile.propTypes = {
    user: ImmutablePropTypes.map.isRequired,
    getUser: PropTypes.func.isRequired
};

export default Profile;
