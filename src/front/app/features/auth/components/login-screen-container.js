import { connect } from 'react-redux';
import { hashHistory } from 'react-router';
import { login, LOGIN_SERVICES } from '../auth.actions';
import LoginScreen from './login-screen';

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({
    facebookLogin: () => {
        dispatch(login(LOGIN_SERVICES.FACEBOOK)).then(() => {
            hashHistory.push('main/challenges');
        });
    },
    googleLogin: () => {
        dispatch(login(LOGIN_SERVICES.GOOGLE_PLUS)).then(() => {
            hashHistory.push('main/challenges');
        });
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
