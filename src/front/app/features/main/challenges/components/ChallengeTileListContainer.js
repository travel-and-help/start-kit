import { connect } from 'react-redux';
import { watchChallenge } from '../../../challenge/challenge.actions';
import ChallengeTileList from '../../../../common/components/challenge/ChallengeTileList';
import { Map } from 'immutable';

const mapDispatchToProps = (dispatch) => ({
    leftSwipe: new Map({
        text: 'Add to watchlist',
        type: 'watch',
        action(challenge) {
            dispatch(watchChallenge(challenge.get('_id')));
        }
    })
});

export default connect(null, mapDispatchToProps)(ChallengeTileList);
