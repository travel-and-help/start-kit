import React, { PropTypes } from 'react';
import FormHeader from '../../../common/components/create/FormHeader';
import CreateFormContainer from '../../create/components/CreateFormContainer';

const EditScreen = ({ params }) => (
    <section className="challenge-create" >
        <FormHeader headerTitle="Edit Challenge" />
        <CreateFormContainer challengeId={ params.challengeId } />
    </section>
);

EditScreen.propTypes = {
    params: PropTypes.object
};

export default EditScreen;
