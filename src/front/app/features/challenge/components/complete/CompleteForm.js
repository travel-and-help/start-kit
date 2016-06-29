import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import CreatePhoto from '../../../../common/components/create/CreatePhoto';

const CreateFormBody = ({ handleSubmit, postComplete, fields: { image } }) => (
    <form onSubmit={handleSubmit(postComplete)} >
        <div className="challenge-complete__body">
            <div className="challenge-complete__body-title">Good job!</div>
            <div className="challenge-complete__icons">
                <div className="challenge-complete__icon">
                    <CreatePhoto {...image} />
                    <span className="challenge-complete__add-photo-text">Add Photo</span>
                </div>
                <div className="challenge-complete__icon">
                   <button className="share-facebook">Share</button>
                </div>
            </div>
            <div className="challenge-complete__submit-wrapper">
               <button className="challenge-complete__submit-btn" type="submit">Submit</button>
            </div>
        </div>
    </form>
);

CreateFormBody.propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    postComplete: PropTypes.func.isRequired
};

export default reduxForm({
    form: 'complete',
    fields: [
        'image'
    ]
})(CreateFormBody);
