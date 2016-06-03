import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Layout from '../../../Layout';
import ChallengeScreenMenu from './ChallengeScreenMenu';
import TopChallengeTile from './TopChallengeTile';
import ChallengeTileList from '../../../../common/components/challenge/ChallengeTileList';

class ChallengeScreen extends React.Component {
    componentDidMount() {
        this.props.getChallenges();
    }

    render() {
        const { topChallenge } = this.props;
        return (
            <Layout menu={<ChallengeScreenMenu />} >
                <div className="challenge-screen__content" >
                    { topChallenge && <TopChallengeTile challenge={topChallenge} /> }
                    <ChallengeTileList
                        {...this.props}
                    />
                </div>
            </Layout>
        );
    }

}

ChallengeScreen.propTypes = {
    topChallenge: ImmutablePropTypes.map.isRequired,
    challenges: ImmutablePropTypes.list.isRequired,
    getChallenges: PropTypes.func.isRequired
};

export default ChallengeScreen;
