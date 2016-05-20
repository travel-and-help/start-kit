import React, { PropTypes } from 'react';

const CreateFormError = ({ message }) => (
    <div className="challenge-create__error">{ message }</div>
);

CreateFormError.propTypes = {
    message: PropTypes.string
};


export default CreateFormError;
