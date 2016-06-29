import IconButton from './IconButton';
import { goBack } from 'react-router-redux';
import { connect } from 'react-redux';

const mapStateToProps = (state, { lightness }) => ({
    iconName: 'back',
    iconSize: 24,
    iconClassName: `icon_${lightness}`
});

const mapDispatchToProps = (dispatch) => ({
    clickHandler() {
        dispatch(goBack());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(IconButton);
