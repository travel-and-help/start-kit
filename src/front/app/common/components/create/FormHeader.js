import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { goBack } from 'react-router-redux';

const CreateFormHeader = ({ headerTitle, back }) => (
    <header className="challenge-create-header">
        <h1 className="challenge-create-header__title">{ headerTitle }</h1>

        <button
          className="challenge-create-header__discard"
          type="button"
          onClick={ back }
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
    back: PropTypes.func
};

const mapDispatchToProps = dispatch => ({
    back: () => dispatch(goBack())
});

export default connect(null, mapDispatchToProps)(CreateFormHeader);
