import { load } from '../profile.actions';
import {
    navigate as navigateToWatchList
} from '../../../profile-challenges/watch-list/watchList.actions';

import loadable from '../../../../common/components/loadable';
import Profile from './Profile';
import { connect } from 'react-redux';

const mapStateToProps = ({ profile, createdChallenges }) => ({
    profile,
    createdChallenges
});

const mapDispatchToProps = (dispatch) => ({
    onLoad() {
        dispatch(load());
    },
    onWatchListClick() {
        dispatch(navigateToWatchList());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(loadable(Profile));
