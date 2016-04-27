import React from 'react';
import { Link } from 'react-router';

const LoginAction = ({ text }) => (
    <button type="button" className="login-button">
        {text}
    </button>
);

LoginAction.propTypes = {
    text: React.PropTypes.string
};

export default () => (
    <div className="login-screen">
        <div className="login-screen__logo">T&H</div>
        <div className="login-screen__slogan">Make your trip useful</div>

        <section className="login-screen-actions">
            <div className="login-screen-actions__header">Sign up</div>
            <div className="login-screen-actions__providers">
                <LoginAction text="Facebook" />
                <LoginAction text="G+" />
                <LoginAction text="E-mail" />
            </div>
            <Link to="challenges" className="login-screen-actions__skip">
                Skip login
            </Link>
        </section>
    </div>
);
