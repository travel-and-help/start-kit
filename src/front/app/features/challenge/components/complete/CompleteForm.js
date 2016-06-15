import React, { PropTypes } from 'react';

const CreateFormBody = ({ handleSubmit }) => (
    <form onSubmit={(formData) => handleSubmit(formData)}>
        <div className="challenge-complete__body">
            <div className="challenge-complete__body-title">Good job!</div>
            <div className="challenge-complete__icons">
                <div className="challenge-complete__icon">
                    <button className="create-photo">Add Photo</button>
                </div>
                <div className="challenge-complete__icon">
                   <button className="share-facebook">Share</button>
                </div>
            </div>
            <div className="challenge-complete__submit-wrapper">
               <button className="challenge-complete__submit-btn">Submit</button>
            </div>
        </div>
    </form>
);

CreateFormBody.propTypes = {
    handleSubmit: PropTypes.func.isRequired
};

export default CreateFormBody;

