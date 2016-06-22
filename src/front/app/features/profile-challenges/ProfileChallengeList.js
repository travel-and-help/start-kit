import React, { Component, PropTypes } from 'react';
import { hashHistory } from 'react-router';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Layout from '../Layout';
import Menu from './ProfileChallengeMenu';
import ChallengeTileList from '../../common/components/challenge/ChallengeTileList';

class ProfileChallengeList extends Component {

    componentDidMount() {
        const { getChallenges, user } = this.props;
        getChallenges();
        if (!user) {
            hashHistory.push('/');
        }
    }

    render() {
        const {
            menuTitle,
            challenges,
            leftSwipe,
            rightSwipe
        } = this.props;

        return (
            <Layout menu={<Menu title={menuTitle} />} >
                <div className="profile-challenge-list" >
                    <ChallengeTileList
                        challenges={challenges}
                        leftSwipe={leftSwipe}
                        rightSwipe={rightSwipe}
                    />
                </div>
            </Layout>
        );
    }
}

ProfileChallengeList.propTypes = {
    menuTitle: PropTypes.string.isRequired,
    challenges: ImmutablePropTypes.list.isRequired,
    getChallenges: PropTypes.func.isRequired,
    leftSwipe: ImmutablePropTypes.mapContains({
        action: PropTypes.func,
        type: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired
    }).isRequired,
    rightSwipe: ImmutablePropTypes.mapContains({
        action: PropTypes.func,
        type: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired
    }).isRequired,
    user: PropTypes.string
};

export default ProfileChallengeList;
