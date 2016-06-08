import React from 'react';
import CompleteForm from './CompleteForm';
import { mount } from 'enzyme';
const chai = require('chai'),
    expect = chai.expect;

describe('features/challenge/components/complete/CompleteForm', () => {
    let sut;

    beforeEach(() => {
        sut = mount(<CompleteForm />);
    });

    it('should contains add photo option', () => {
        expect(sut.find('.create-photo').should.exist);
    });

});
