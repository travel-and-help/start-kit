import React, { PropTypes } from 'react';


const CreateFormBody = ({ handleSubmit, id }) => (
    <form onSubmit={(formData) => handleSubmit(id, formData)}>
        <div className="challenge-complete__body">
            <div className="challenge-complete__body-title">Good job!</div>
            <div className="create-photo"></div>
            <button type="submit">Submit</button>
        </div>
    </form>
);

CreateFormBody.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired
};

export default CreateFormBody;
