import React, { PropTypes } from 'react';
import LoginButton from './LoginButton';

const LoginScreen = ({ facebookLogin, googleLogin, skipLogin }) => (
    <div className="login-screen-wrap" >
        <div className="login-screen" >
            <h1 className="login-screen__name" >
                Travel & Help
            </h1>

            <h2 className="login-screen__title login-screen__title_top" >
                The best way to connect with good people around the world.
            </h2>

            <img className="login-screen__logo" alt="logo" />

            <h2 className="login-screen__title login-screen__title_bottom" >
                Get help. Give back.
            </h2>

            <LoginButton
                text="Facebook"
                onClick={facebookLogin}
            />

            <LoginButton
                text="G+"
                onClick={googleLogin}
            />

            <div
                className="login-screen__skip"
                onClick={skipLogin}
            >
                Skip
            </div>
        </div>
    </div>
);

LoginScreen.propTypes = {
    googleLogin: PropTypes.func.isRequired,
    facebookLogin: PropTypes.func.isRequired,
    skipLogin: PropTypes.func.isRequired
};

export default LoginScreen;
