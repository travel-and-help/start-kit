import React, { PropTypes } from 'react';

const CreateFormBody = ({ handleSubmit, id }) => (
    <form onSubmit={(formData) => handleSubmit(id, formData)}>
        <div className="challenge-complete__body">
            <div className="challenge-complete__body-title">Good job!</div>


            <div className="challenge-complete__icons">
            <div className="challenge-complete__icon">
                <div className="create-photo"></div>
            <h5 type="submit">Add Photo</h5></div>
           <div className="challenge-complete__icon">
               <div className="share-facebook"></div>
            <h5 type="submit">Submit</h5></div>
            </div>
            <div className="challenge-complete__more-list-title">
                More challenges
            </div>
        </div>
    </form>
);

CreateFormBody.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired
};

export default CreateFormBody;

