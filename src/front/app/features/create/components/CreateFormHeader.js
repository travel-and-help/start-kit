import React from 'react';

const CreateFormHeader = () => {
    const discard = () => {
        window.history.back();
    };

    return (
        <header className="challenge-create__header">
            <h1 className="challenge-create__title">Create Challenge</h1>

            <button className="challenge-create__discard" type="button" onClick={ discard }>
                Discard
            </button>

            <button className="challenge-create__post" type="submit">
                Post
            </button>

        </header>
    );
};


export default CreateFormHeader;
