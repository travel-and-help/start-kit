import React, { PropTypes } from 'react';
import { hashHistory } from 'react-router';

const CreateFormHeader = ({ headerTitle }) => (
    <header className="challenge-create-header">
        <h1 className="challenge-create-header__title">{ headerTitle }</h1>

        <button
          className="challenge-create-header__discard"
          type="button"
          onClick={ () => hashHistory.goBack() }
        >

            Discard
        </button>

        <button className="challenge-create-header__post" type="submit">
            Post
        </button>
    </header>
);

CreateFormHeader.propTypes = {
    headerTitle: PropTypes.string
};

export default CreateFormHeader;
