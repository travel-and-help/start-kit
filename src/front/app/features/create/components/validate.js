const validate = (values) => {
    console.log(values);

    const errors = {};

    if (!values.title) {
        errors.title = 'Title is required';
    }

    if (!values.description) {
        errors.description = 'Description is required';
    }

    if (!values.level) {
        errors.level = 'Level is required';
    }

    return errors;
};

export default validate;
