import React from 'react';
import FormHeader from './FormHeader';
import { render, mount } from 'enzyme';
const chai = require('chai'),
    expect = chai.expect;

describe('FormHeader', () => {
    let sut;
    let dispatch;
    let mockStore;

    beforeEach(() => {
        dispatch = env.spy();

        mockStore = {
            subscribe: env.spy(),
            getState: env.stub().returns({
                form: {}
            }),
            dispatch
        };
    });

    it('should contains page title', () => {
        sut = render(<FormHeader
            store={mockStore}
            headerTitle="Create Challenge"
        />);

        sut.find('.challenge-create-header__title')
            .text().should.equal('Create Challenge');
    });

    it('should contains button with type submit', () => {
        sut = render(<FormHeader
            store={mockStore}
            headerTitle="Create Challenge"
        />);

        sut.find('.challenge-create-header__post').attr('type').should.equal('submit');
    });

    it('should execute  onDiscardClick function by clicking on discard button', () => {
        sut = mount(<FormHeader
            store={mockStore}
            headerTitle="Create Challenge"
        />);

        sut.find('.challenge-create-header__discard').simulate('click');
        expect(dispatch.calledOnce).to.equal(true);
    });
});
