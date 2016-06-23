import React, { PropTypes } from 'react';
import CreateFormContainer from './CreateFormContainer';

const CreateScreen = ({ params }) => (
    <section className="challenge-create" >
        <CreateFormContainer
            challengeId={ params.challengeId }
            headerTitle="Create Challenge"
        />
    </section>
);

CreateScreen.propTypes = {
    params: PropTypes.object
};

export default CreateScreen;
