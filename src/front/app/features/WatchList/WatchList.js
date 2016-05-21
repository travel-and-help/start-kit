import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

class WatchList extends Component {
    componentDidMount() {
        this.props.getInitialChallenges();
    }

    render() {
        const { challenges } = this.props;

        return (
            <ul className="challenges__challengeList" >
                {(challenges || []).map((challenge, index) => (
                    <div>{ index } { challenge }</div>
                ))}
            </ul>
        );
    }
}

WatchList.propTypes = {
    challenges: ImmutablePropTypes.list.isRequired,
    getInitialChallenges: PropTypes.func.isRequired
};

export default WatchList;
