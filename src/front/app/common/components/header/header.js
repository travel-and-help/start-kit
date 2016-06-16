import React, { PropTypes } from 'react';

const CreateFormHeader = ({ title, onDiscardClick, children }) => (
    <header className="header">
        <h1 className="header__title">{title}</h1>
        <button
          className="header__discard"
          type="button"
          onClick={onDiscardClick}
        >Discard</button>
        {children}
    </header>
);

CreateFormHeader.propTypes = {
    title: PropTypes.string,
    onDiscardClick: PropTypes.func,
    children: PropTypes.element
};

export default CreateFormHeader;
