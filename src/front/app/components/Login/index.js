import React from 'react';
import { Component } from 'react';
import { Link } from 'react-router';
import LoginButton from './login-button';
import { connect } from 'react-redux';
import { login } from '../../actions/login';
import { LOGIN_SERVICES } from '../../constants/login';

function createHandlers(dispatch) {
    const facebookLogin = () => {
        dispatch(login(LOGIN_SERVICES.FACEBOOK));
    };
    const googleLogin = () => {
        dispatch(login(LOGIN_SERVICES.GOOGLE_PLUS));
    };
    return {
        facebookLogin,
        googleLogin
    };
}

class Login extends Component {
    constructor(props) {
        super(props);
        this.handlers = createHandlers(this.props.dispatch);
    }

    render() {
        return (
            <div className="login-screen" >
                <div className="login-screen__logo" >T&H</div>
                <div className="login-screen__slogan" >Make your trip useful</div>

                <section className="login-screen-actions" >
                    <div className="login-screen-actions__header" >Sign up</div>
                    <div className="login-screen-actions__providers" >
                        <LoginButton text="Facebook" onLogin={this.handlers.facebookLogin} />
                        <LoginButton text="G+" onLogin={this.handlers.googleLogin} />
                        <LoginButton text="E-mail" />
                    </div>
                    <Link to="challenges" className="login-screen-actions__skip" >
                        Skip login
                    </Link>
                </section>
            </div>
        );
    }
}

export default connect()(Login);
