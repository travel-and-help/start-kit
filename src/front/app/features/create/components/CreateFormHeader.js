import React from 'react';

const CreateFormHeader = () => {
    const discard = () => {
        window.history.back();
    };

    return (
        <header className="challenge-create-header">
            <h1 className="challenge-create-header__title">Create Challenge</h1>

            <button className="challenge-create-header__discard" type="button" onClick={ discard }>
                Discard
            </button>

            <button className="challenge-create-header__post" type="submit">
                Post
            </button>
        </header>
    );
};


export default CreateFormHeader;
