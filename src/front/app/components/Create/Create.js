import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import Header from './Header';
import Body from './Body';

const validate  = (values) => {
    const errors = {};

    if (!values.title) {
        errors.title = 'Title is required';
    }

    if(!values.description) {
        errors.description = 'Description is required';
    }

    return errors;
};

class Form extends Component  {
    constructor(props) {
        super(props);

        const {categories, dispatch} = props;

        //if(!categories) {
        //    dispatch(fetchCategories());
        //}

        this.postData = this.postData.bind(this);
    }

    postData() {
        console.log('Submited!');
    }

    render() {
        const {fields: {title, description}, handleSubmit} = this.props;

        return (
            <section className="challenge-create">
                <form onSubmit={ handleSubmit(this.postData) }>
                    <Header />
                    <Body title={title} description={description} />
                </form>
            </section>
        )
    }
}

function fetchCategories () {
    return function innerFetch(dispatch) {
        fetch('/api/')
            .then( (data) => {
                dispatch({
                    type: 'test',
                    data
                })
            })
    }
}

Form.propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired
};

const FormWithRedux = reduxForm({
    form: 'create',
    fields: ['title', 'description'],
    validate,
    touchOnChange: true
})(Form);

const mapStateToProps = ({ categories }) => ({ categories });

export default connect(mapStateToProps)(FormWithRedux)
