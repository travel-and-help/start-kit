import { connect } from 'react-redux';
import { login, skip, LOGIN_SERVICES } from '../auth.actions';
import LoginScreen from './LoginScreen';

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({
    facebookLogin() {
        dispatch(login(LOGIN_SERVICES.FACEBOOK));
    },
    googleLogin() {
        dispatch(login(LOGIN_SERVICES.GOOGLE_PLUS));
    },
    skipLogin() {
        dispatch(skip());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
