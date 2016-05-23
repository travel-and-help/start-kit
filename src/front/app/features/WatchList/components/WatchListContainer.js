import { connect } from 'react-redux';
import WatchList from './WatchList';
import { getInitialChallenges } from './../watchList.actions.js';

const mapStateToProps = ({ watchList }) => ({ challenges: watchList });

const mapDispatchToProps = (dispatch) => ({
    getInitialChallenges: () => {
        dispatch(getInitialChallenges());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(WatchList);
