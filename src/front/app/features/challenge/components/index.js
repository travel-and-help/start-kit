import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { fetchChallenge } from './../challenge.actions';
import ChallengeNav from './ChallengeNav';
import ChallengeDetails from './ChallengeDetails';
import ChallengeComments from './ChallengeComments';

class Challenge extends Component {
    componentDidMount() {
        const { challenge } = this.props;

        if (!challenge._id) {
            const id = this.props.params.id;
            const dispatch = this.props.dispatch;
            dispatch(fetchChallenge(id));
        }
    }

    render() {
        return (
            <div className="challenge-details">
                <ChallengeNav />
                <ChallengeDetails {...this.props.challenge} />
                <ChallengeComments />
            </div>
        );
    }
}


Challenge.propTypes = {
    dispatch: React.PropTypes.func
};

const mapStateToProps = ({ challenge }) => ({ challenge });

export default connect(mapStateToProps)(Challenge);
