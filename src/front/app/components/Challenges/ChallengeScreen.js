import React, { PropTypes } from 'react';
import Menu from './Menu';
import ChallengeJumbotron from '../common/challenge/ChallengeJumbotron';
import ChallengeTileList from '../common/challenge/ChallengeTileList';
import Navigation from './../Navigation';
import ImmutablePropTypes from 'react-immutable-proptypes';

class ChallengesScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isMenuActive: false
        };
        this.onScroll = this.onScroll.bind(this);
    }

    componentDidMount() {
        this.props.getChallenges();
    }

    onScroll(e) {
        e.preventDefault();
        this.setState({
            isMenuActive: Boolean(e.target.scrollTop)
        });
    }

    render() {
        const { isMenuActive } = this.state;
        const { challenges } = this.props;
        const topChallenge = challenges.first(),
            otherChallenges = challenges.slice(1);

        return (
            <div className="challenges" onScroll={ this.onScroll } >
                <Menu active={ isMenuActive } />
                { topChallenge && <ChallengeJumbotron challenge={ topChallenge } /> }
                <ChallengeTileList challenges={otherChallenges} />
                <Navigation />
            </div>
        );
    }

}

ChallengesScreen.propTypes = {
    challenges: ImmutablePropTypes.list.isRequired,
    getChallenges: PropTypes.func.isRequired
};

export default ChallengesScreen;
