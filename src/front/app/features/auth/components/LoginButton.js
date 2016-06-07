import React, { PropTypes } from 'react';

const LoginButton = ({ text, onClick }) => (
    <button
        className="login-button login-screen__item"
        type="button"
        onClick={onClick}
    >
        Continue with {text}
    </button>
);

LoginButton.propTypes = {
    text: PropTypes.string,
    onClick: PropTypes.func.isRequired
};

export default LoginButton;
