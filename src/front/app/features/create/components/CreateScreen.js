import React, { PropTypes } from 'react';
import FormHeader from '../../../common/components/create/FormHeader';
import CreateFormContainer from './CreateFormContainer';

const CreateScreen = ({ params }) => (
    <section className="challenge-create" >
        <FormHeader headerTitle="Create Challenge" />
        <CreateFormContainer challengeId={ params.challengeId } />
    </section>
);

CreateScreen.propTypes = {
    params: PropTypes.object
};

export default CreateScreen;
