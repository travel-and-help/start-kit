import React, { PropTypes, Component } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import ChallengeNav from './ChallengeNav';
import ChallengeDetails from './ChallengeDetails';
import ChallengeComments from './ChallengeComments';

class Challenge extends Component {
    componentDidMount() {
        const props = this.props;
        const id = props.params.id;

        props.getChallenge(id);
    }

    componentWillUnmount() {
        this.props.getInitialState();
    }

    render() {
        return (
            <div className="challenge-details">
                {this.props.challenge.size && <ChallengeNav />}
                {this.props.challenge.size && <ChallengeDetails challenge={this.props.challenge} />}
                {this.props.challenge.size && <ChallengeComments />}
            </div>
        );
    }
}

Challenge.propTypes = {
    challenge: ImmutablePropTypes.map.isRequired,
    getChallenge: PropTypes.func.isRequired,
    getInitialState: PropTypes.func.isRequired
};

export default Challenge;
