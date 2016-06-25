import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Layout from '../../../Layout';
import ChallengeScreenMenu from './ChallengeScreenMenu';
import TopChallengeTile from './TopChallengeTile';
import ChallengeTileList from './ChallengeTileListContainer';

const ChallengeScreen = ({ topChallenge, challenges }) => (
    <Layout menu={<ChallengeScreenMenu />} >
        <div className="challenge-screen__content" >
            {topChallenge && <TopChallengeTile challenge={topChallenge} />}
            <ChallengeTileList
                challenges={challenges}
            />
        </div>
    </Layout>
);

ChallengeScreen.propTypes = {
    topChallenge: ImmutablePropTypes.map,
    challenges: ImmutablePropTypes.list.isRequired
};

export default ChallengeScreen;
