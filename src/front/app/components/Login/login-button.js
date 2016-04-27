import React from 'react';
import { connect } from 'react-redux';

const loginButton = ({ text, onLogin }) => (
    <button type="button" className="login-button" onClick={onLogin} >
        {text}
    </button>
);

export default connect()(loginButton);
