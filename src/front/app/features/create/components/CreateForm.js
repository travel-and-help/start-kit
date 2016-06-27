import React, { Component, PropTypes } from 'react';
import FormHeader from '../../../common/components/create/FormHeader';
import CreateFormBody from './CreateFormBody';
import ImmutablePropTypes from 'react-immutable-proptypes';

class CreateForm extends Component {
    componentWillUnmount() {
        this.props.resetState();
    }

    render() {
        const {
            fields,
            handleSubmit,
            sendChallenge,
            categories,
            headerTitle,
        } = this.props;

        return (
            <form onSubmit={ handleSubmit(sendChallenge) } >
                <FormHeader headerTitle={headerTitle} />
                <CreateFormBody fields={fields} categories={categories} />
            </form>
        );
    }
}

CreateForm.propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    sendChallenge: PropTypes.func.isRequired,
    resetState: PropTypes.func.isRequired,
    categories: ImmutablePropTypes.list.isRequired,
    headerTitle: PropTypes.string
};

export default CreateForm;
