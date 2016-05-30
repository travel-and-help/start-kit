import React, { PropTypes } from 'react';

const LoginButton = ({ text, onClick }) => (
    <button
        className="login-button"
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
