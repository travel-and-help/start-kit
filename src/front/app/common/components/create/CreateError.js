import React, { PropTypes } from 'react';

const CreateError = ({ message }) => (
    <div className="create-error">{ message }</div>
);

CreateError.propTypes = {
    message: PropTypes.string
};


export default CreateError;
