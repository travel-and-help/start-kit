import React, { Component, PropTypes } from 'react';
import ChallengeTileList from '../../../common/components/challenge/ChallengeTileList';
import ImmutablePropTypes from 'react-immutable-proptypes';

class WatchList extends Component {
    componentDidMount() {
        this.props.getInitialChallenges();
    }
    render() {
        const { challenges } = this.props;
        return (
            <div className="challenges">
                <br />
                <ChallengeTileList challenges={challenges} />
            </div>
        );
    }
}

WatchList.propTypes = {
    challenges: ImmutablePropTypes.list.isRequired,
    getInitialChallenges: PropTypes.func.isRequired
};

export default WatchList;
