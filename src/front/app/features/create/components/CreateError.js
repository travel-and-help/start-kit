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
        <div className={(errorMessage === '') ?
          'create-error create-error_hide' : 'create-error'}
        >

            <div className="create-error__message">
                <div className="create-error__holder"></div>
                {errorMessage}
                <div className="create-error__holder"></div>
            </div>
        </div>
    );
};

CreateError.propTypes = {
    formFields: PropTypes.object.isRequired
};


export default CreateError;
