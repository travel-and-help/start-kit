import { connect } from 'react-redux';
import { login, LOGIN_SERVICES } from '../auth.actions';
import LoginScreen from './login-screen';

const mapStateToProps = ({}) => ({});

const mapDispatchToProps = (dispatch) => ({
    facebookLogin: () => {
        dispatch(login(LOGIN_SERVICES.FACEBOOK));
    },
    googleLogin: () => {
        dispatch(login(LOGIN_SERVICES.GOOGLE_PLUS));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
