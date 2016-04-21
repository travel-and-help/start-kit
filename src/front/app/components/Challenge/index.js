import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import ChallengeNav from './ChallengeNav';
import ChallengeDetails from './ChallengeDetails';
import ChallengeComments from './ChallengeComments';

class Challenge extends Component {
    componentDidMount() {
        const id = this.props.params.id;
        const dispatch = this.props.dispatch;
        dispatch(getChallenge(id));
    }

    render() {
        return (
            <div>
                <ChallengeNav />
                <ChallengeDetails {...this.props.challenge} />
                <ChallengeComments />
            </div>
        );
    }
}

const mapStateToProps = ({ challenge }) => ({ challenge });

function getChallenge(id) {
    return function fetchChallenge(dispatch) {
        fetch('http://localhost:9000/api/challenge/' + id)
        //fetch('/api/challenge/' + id)
            .then(response => response.json())
            .then((challenge) => {
                dispatch({
                    type: 'GET_CHALLENGE',
                    challenge
                });
            });
    };
}

Challenge.propTypes = {
    dispatch: React.PropTypes.func
};

Challenge = connect(
    mapStateToProps
)(Challenge);

export default Challenge;
