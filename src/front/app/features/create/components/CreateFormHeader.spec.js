import proxyquire from 'proxyquire';
import React from 'react';
import CreateFormHeader from './CreateFormHeader';
import { mount } from 'enzyme';
const chai = require('chai'),
    expect = chai.expect;

describe('CreateFormHeader', () => {
    let sut;
    let goBack;

    beforeEach(() => {
        goBack = env.stub();

        sut = mount(<CreateFormHeader onDiscardClick={goBack} />);
    });

    it('should contains page title', () => {
        sut.find('.challenge-create-header__title')
            .text().should.equal('Create Challenge');
    });

    it('should contains button with type submit', () => {
        sut.find('.challenge-create-header__post').prop('type').should.equal('submit');
    });

    it('should execute  onDiscardClick function by clicking on discard button', () => {
        sut.find('.challenge-create-header__discard').simulate('click');
        expect(goBack.calledOnce).to.equal(true);
    });
});
