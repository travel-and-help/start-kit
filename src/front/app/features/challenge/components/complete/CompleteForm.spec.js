import React from 'react';
import CompleteForm from './CompleteForm';
import { mount } from 'enzyme';
const chai = require('chai'),
    expect = chai.expect;

describe('features/challenge/components/complete/CompleteForm', () => {
    let sut,
        submitHandler;

    beforeEach(() => {
        submitHandler = env.stub();
        sut = mount(<CompleteForm handleSubmit={submitHandler} />);
    });

    it('should contains add photo option', () => {
        expect(sut.find('.create-photo').should.exist);
    });

    it('should trigger handleSubmit method on submit click', () => {
        sut.find('form').simulate('submit');
        expect(submitHandler.called).to.equal(true);
    });

});
