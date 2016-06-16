import React from 'react';
import CompleteForm from './CompleteForm';
import { shallow } from 'enzyme';
const chai = require('chai'),
    expect = chai.expect;

describe('features/challenge/components/complete/CompleteForm', () => {
    let sut,
        subminHandler;

    beforeEach(() => {
        subminHandler = env.stub();
        sut = shallow(<CompleteForm handleSubmit={subminHandler}/>);
    });

    it('should contains add photo option', () => {
        expect(sut.find('.create-photo').should.exist);
    });

    xit('should trigger handleSubmit method on submit click', () => {
        const button = sut.find('.challenge-complete__submit-btn').at(0);
        button.simulate('click');
        subminHandler.should.calledWith();
    });

});
