import React, { PropTypes } from 'react';

const CreateFormHeader = ({ headerTitle, discardHandler }) => (
    <header className="challenge-create-header">
        <h1 className="challenge-create-header__title">{ headerTitle }</h1>

        <button
          className="challenge-create-header__discard"
          type="button"
          onClick={ discardHandler }
        >

            Discard
        </button>

        <button className="challenge-create-header__post" type="submit">
            Post
        </button>
    </header>
);

CreateFormHeader.propTypes = {
    headerTitle: PropTypes.string,
    discardHandler: PropTypes.func
};

export default CreateFormHeader;
