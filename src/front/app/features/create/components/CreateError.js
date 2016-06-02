import React, { PropTypes } from 'react';

const CreateError = ({ formFields }) => {
    let errorMessage = '';

    Object.keys(formFields).forEach((key) => {
        if (formFields[key].error && formFields[key].touched) {
            errorMessage = 'Fill all necessary fields';

            return;
        }
    });

    return (
        <div className="create-error">
            <div className="create-error__message">
                {errorMessage}
            </div>
        </div>
    );
};

CreateError.propTypes = {
    formFields: PropTypes.object.isRequired
};


export default CreateError;
