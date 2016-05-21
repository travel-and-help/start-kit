import { connect } from 'react-redux';
import WatchList from './WatchList';
import { getInitialChallenges } from './watchList.actions';

const mapStateToProps = ({ challenges }) => ({ challenges });

const mapDispatchToProps = (dispatch) => ({
    getInitialChallenges: () => {
        dispatch(getInitialChallenges());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(WatchList);
