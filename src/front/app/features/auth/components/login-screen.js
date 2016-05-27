import React, { PropTypes } from 'react';
import LoginButton from './login-button';

const LoginScreen = ({ facebookLogin, googleLogin, skipLogin }) => (
    <div className="login-screen" >
        <div className="login-screen__logo" >T&H</div>
        <div className="login-screen__slogan" >Make your trip useful</div>

        <section className="login-screen-actions" >
            <div className="login-screen-actions__header" >Sign up</div>
            <div className="login-screen-actions__providers" >
                <LoginButton text="Facebook" onLogin={() => {facebookLogin();}} />
                <LoginButton text="G+" onLogin={() => {googleLogin();}} />
            </div>
            <a className="login-screen-actions__skip" onClick={() => {skipLogin();}} >
                Skip login
            </a>
        </section>
    </div>
);

LoginScreen.propTypes = {
    googleLogin: PropTypes.func.isRequired,
    facebookLogin: PropTypes.func.isRequired,
    skipLogin: PropTypes.func.isRequired
};

export default LoginScreen;
