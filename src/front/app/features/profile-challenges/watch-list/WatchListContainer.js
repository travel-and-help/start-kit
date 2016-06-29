import { connect } from 'react-redux';
import WatchList from '../ProfileChallengeList';
import { load, unWatch } from './watchList.actions';
import { acceptChallenge } from '../../challenge/challenge.actions';
import { Map } from 'immutable';
import loadable from '../../../common/components/loadable';

const mapStateToProps = ({ watchList }) => ({
    menuTitle: 'watch list',
    challenges: watchList
});

const mapDispatchToProps = (dispatch) => ({
    onLoad() {
        dispatch(load());
    },
    leftSwipe: new Map({
        text: 'Accept',
        type: 'accept',
        action(challenge) {
            dispatch(acceptChallenge(challenge.get('_id')))
                .then(() => dispatch(load()));
        }
    }),
    rightSwipe: new Map({
        text: 'Dismiss',
        type: 'dismiss',
        action(challenge) {
            dispatch(unWatch(challenge));
        }
    })
});

export default connect(mapStateToProps, mapDispatchToProps)(loadable(WatchList));
