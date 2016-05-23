import React, { Component, PropTypes } from 'react';
import ChallengeTileList from '../../../common/components/challenge/ChallengeTileList';
import Navigation from '../../navigation';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { hashHistory } from 'react-router';

class WatchList extends Component {
    componentDidMount() {
        this.props.getInitialChallenges();
    }

    render() {
        const { challenges } = this.props;
        return (
            <div className="challenges">
                <div onClick={hashHistory.goBack}>&lt; Watch List</div>
                <ChallengeTileList challenges={challenges} />
                <Navigation />
            </div>
        );
    }
}

WatchList.propTypes = {
    challenges: ImmutablePropTypes.list.isRequired,
    getInitialChallenges: PropTypes.func.isRequired
};

export default WatchList;
