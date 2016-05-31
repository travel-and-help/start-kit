const validate = (values) => {
    const errors = {};

    if (!values.title) {
        errors.title = 'Title is required';
    }

    if (!values.description) {
        errors.description = 'Description is required';
    }

    if (values.category === '-1' || !values.category) {
        errors.category = 'Description is required';
    }

    return errors;
};

export default validate;
