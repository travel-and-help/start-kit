import React from 'react';
import proxyquire from 'proxyquire';
import { mount } from 'enzyme';
const chai = require('chai'),
    expect = chai.expect;

describe('FormHeader', () => {
    let sut;
    let router;

    beforeEach(() => {
        router = {
            hashHistory: {
                goBack: env.spy()
            }
        };

        const FormHeader = proxyquire('./FormHeader', {
            'react-router': router
        }).default;

        sut = mount(<FormHeader headerTitle="Create Challenge" />);
    });

    it('should contains page title', () => {
        sut.find('.challenge-create-header__title')
            .text().should.equal('Create Challenge');
    });

    it('should contains button with type submit', () => {
        sut.find('.challenge-create-header__post').prop('type').should.equal('submit');
    });

    it('should execute  onDiscardClick function by clicking on discard button', () => {
        sut.find('.challenge-create-header__discard')
            .simulate('click');
        expect(router.hashHistory.goBack.calledOnce).to.equal(true);
    });
});
