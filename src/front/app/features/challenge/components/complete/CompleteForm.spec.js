import React from 'react';
import { mount } from 'enzyme';
import proxyquire from 'proxyquire';
const chai = require('chai'),
    expect = chai.expect;

describe('features/challenge/components/complete/CompleteForm', () => {
    let sut,
        submitHandler,
        handleSubmit,
        mockStore,
        CompleteForm;

    beforeEach(() => {
        submitHandler = env.stub();
        handleSubmit = env.stub();
        const reduxForm = env.spy(() => (component) => component);
        mockStore = {
            subscribe: env.spy(),
            getState: env.stub().returns({ form: {} }),
            dispatch: env.spy()
        };
        CompleteForm = proxyquire('./CompleteForm', {
            'redux-form': reduxForm
        }).default;
        sut = mount(<CompleteForm
            store={mockStore}
            postComplete={submitHandler}
            handleSubmit={handleSubmit}
        />);
    });

    it('should contains add photo option', () => {
        expect(sut.find('.create-photo').should.exist);
    });

    it('should trigger handleSubmit method on submit click', () => {
        sut.find('form').simulate('submit');
        expect(submitHandler.called).to.equal(true);
    });

});
