import React, { PropTypes } from 'react';
import CreateFormContainer from '../../create/components/CreateFormContainer';

const EditScreen = ({ params }) => (
    <section className="challenge-create" >
        <CreateFormContainer
            challengeId={ params.challengeId }
            headerTitle="Edit Challenge"
        />
    </section>
);

EditScreen.propTypes = {
    params: PropTypes.object
};

export default EditScreen;
