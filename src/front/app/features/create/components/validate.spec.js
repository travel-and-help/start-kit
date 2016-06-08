import validate from './validate';

const chai = require('chai'),
    expect = chai.expect;

describe('CreateForm validate', () => {
    let values;
    let errors;

    beforeEach(() => {

    });

    it('should validate title field', () => {
        values = {
            title: undefined,
            description: 'some description',
            category: 'some category'
        };

        errors = validate(values);

        expect(errors.title).to.equal('Title is required');
    });

    it('should validate desciprion field', () => {
        values = {
            title: 'some title',
            description: undefined,
            category: 'some category'
        };

        errors = validate(values);

        expect(errors.description).to.equal('Description is required');
    });

    it('should validate category field', () => {
        values = {
            title: 'some title',
            description: 'some description',
            category: undefined
        };

        errors = validate(values);

        expect(errors.category).to.equal('Category is required');
    });
});
