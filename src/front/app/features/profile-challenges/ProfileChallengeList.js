import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Layout from '../Layout';
import Menu from './ProfileChallengeMenu';
import ChallengeTileList from '../../common/components/challenge/ChallengeTileList';

const ProfileChallengeList = ({ menuTitle, challenges, leftSwipe, rightSwipe }) => (
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

ProfileChallengeList.propTypes = {
    menuTitle: PropTypes.string.isRequired,
    challenges: ImmutablePropTypes.list.isRequired,
    leftSwipe: ImmutablePropTypes.mapContains({
        action: PropTypes.func,
        type: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired
    }),
    rightSwipe: ImmutablePropTypes.mapContains({
        action: PropTypes.func,
        type: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired
    })
};

export default ProfileChallengeList;
