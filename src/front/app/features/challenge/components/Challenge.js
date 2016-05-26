import React, { PropTypes } from 'react';
import { Component } from 'react';
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

    render() {
        /* istanbul ignore next */
        return (
            <div className="challenge-details">
                <ChallengeNav />
                <ChallengeDetails {...this.props.challenge.toJS()} />
                <ChallengeComments />
            </div>
        );
    }
}

Challenge.propTypes = {
    challenge: ImmutablePropTypes.map.isRequired,
    getChallenge: PropTypes.func.isRequired
};

export default Challenge;
