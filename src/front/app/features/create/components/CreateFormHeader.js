import React, { PropTypes } from 'react';

const CreateFormHeader = ({ onDiscardClick }) => (
    <header className="challenge-create-header">
        <h1 className="challenge-create-header__title">Create Challenge</h1>

        <button
          className="challenge-create-header__discard"
          type="button"
          onClick={onDiscardClick}
        >

            Discard
        </button>

        <button className="challenge-create-header__post" type="submit">
            Post
        </button>
    </header>
);

CreateFormHeader.propTypes = {
    onDiscardClick: PropTypes.func
};

export default CreateFormHeader;
