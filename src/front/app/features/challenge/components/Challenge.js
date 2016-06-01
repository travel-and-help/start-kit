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
        if (this.props.challenge.size) {
            return (
                <div className="challenge-details">
                    <ChallengeNav />
                    <ChallengeDetails challenge={this.props.challenge} />
                    <ChallengeComments />
                </div>
            );
        }
        return null;
    }
}

Challenge.propTypes = {
    challenge: ImmutablePropTypes.map.isRequired,
    getChallenge: PropTypes.func.isRequired,
    getInitialState: PropTypes.func.isRequired
};

export default Challenge;
