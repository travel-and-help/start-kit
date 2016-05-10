import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import LoginButton from './login-button';

const LoginScreen = ({ facebookLogin, googleLogin }) => (
    <div className="login-screen" >
        <div className="login-screen__logo" >T&H</div>
        <div className="login-screen__slogan" >Make your trip useful</div>

        <section className="login-screen-actions" >
            <div className="login-screen-actions__header" >Sign up</div>
            <div className="login-screen-actions__providers" >
                <LoginButton text="Facebook" onLogin={() => {facebookLogin();}} />
                <LoginButton text="G+" onLogin={() => {googleLogin();}} />
                <LoginButton text="E-mail" />
            </div>
            <Link to="challenges" className="login-screen-actions__skip" >
                Skip login
            </Link>
        </section>
    </div>
);

LoginScreen.propTypes = {
    googleLogin: PropTypes.func.isRequired,
    facebookLogin: PropTypes.func.isRequired
};

export default LoginScreen;
