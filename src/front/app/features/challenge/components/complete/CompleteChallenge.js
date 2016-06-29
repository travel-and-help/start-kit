import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Header from '../../../../common/components/header/header';
import ChallengeList from '../../../../common/components/challenge/ChallengeTileList';
import CompleteForm from './CompleteForm';
import { completeChallenge, fetchSimilarChallenge, watchChallenge } from '../../challenge.actions';
import { hashHistory } from 'react-router';
import { Map } from 'immutable';

class CompleteChallenge extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.goBack = this.goBack.bind(this);
        this.watchChallenge = this.watchChallenge.bind(this);

        this.leftSwipe = new Map({
            text: 'Add to watchlist',
            type: 'watch',
            action: this.watchChallenge
        });
    }

    componentDidMount() {
        const { dispatch } = this.props;
        const { id } = this.props.params;
        dispatch(fetchSimilarChallenge(id));
    }

    watchChallenge(challenge) {
        const { dispatch } = this.props;
        dispatch(watchChallenge(challenge.get('_id')));
    }

    goBack() {
        hashHistory.goBack();
    }

    handleSubmit(formData) {
        const { dispatch } = this.props;
        const { id } = this.props.params;
        dispatch(completeChallenge(id, formData))
            .then(() => {
                hashHistory.push('main/challenges');
            });
    }

    render() {
        const { challenge } = this.props;
        const { id } = this.props.params;
        let similarChallenges = [];
        if (challenge) {
            const similar = challenge.get('similar');
            if (similar) {
                const curSimilar = similar.get(id);
                if (curSimilar) {
                    similarChallenges = curSimilar.get('docs');
                }
            }
        }
        return (
            <section className="challenge-complete">
                <Header title="Challenge completed" onDiscardClick={this.goBack} />
                <div className="challenge-screen__content">
                    <CompleteForm postComplete={this.handleSubmit} />
                    <div className="challenge-complete__more-list">
                        <div className="challenge-complete__more-list-title">
                            More challenges
                        </div>
                        <ChallengeList
                            leftSwipe={ this.leftSwipe }
                            challenges={ similarChallenges }
                        />
                    </div>
                </div>
            </section>
        );
    }
}

CompleteChallenge.propTypes = {
    challenge: PropTypes.object,
    params: PropTypes.object,
    dispatch: PropTypes.func.isRequired
};
export default connect(({ challenge }) => ({ challenge }))(CompleteChallenge);
