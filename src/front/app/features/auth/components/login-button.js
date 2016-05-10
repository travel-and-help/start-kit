import React, { PropTypes } from 'react';

const loginButton = ({ text, onLogin }) => (
    <button type="button" className="login-button" onClick={onLogin} >
        {text}
    </button>
);

loginButton.propTypes = {
    text: PropTypes.string,
    onLogin: PropTypes.func.isRequired
};

export default loginButton;
