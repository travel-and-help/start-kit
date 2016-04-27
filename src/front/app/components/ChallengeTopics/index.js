import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getChallengeTopics, toggleChallengeTopic } from './../../actions/challengeTopics';
import ChallengeTopic from './ChallengeTopic';

class ChallengeTopicList extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(getChallengeTopics());
    }

    handleClick(name) {
        const { dispatch } = this.props;

        dispatch(toggleChallengeTopic(name));
    }

    render() {
        const { challengeTopics } = this.props;

        return (
            <ul>
                {challengeTopics.map((topic, index) => (
                    <ChallengeTopic
                      key={index}
                      {...topic}
                      onClick={() => {this.handleClick(topic.name);}}
                    />
                ))}
            </ul>
        );
    }
}

ChallengeTopicList.propTypes = {
    challengeTopics: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired
    }).isRequired).isRequired,
    dispatch: PropTypes.func.isRequired
};

const mapStateToProps = ({ challengeTopics }) => ({ challengeTopics });

export default connect(mapStateToProps)(ChallengeTopicList);
