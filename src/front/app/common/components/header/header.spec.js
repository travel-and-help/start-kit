import React from 'react';
import Header from './header';
import { mount } from 'enzyme';
const chai = require('chai'),
    expect = chai.expect;

describe('common/components/header', () => {
    let sut,
        goBack,
        title;

    beforeEach(() => {
        goBack = env.stub();
        title = 'testTitle';
        sut = mount(<Header onDiscardClick={goBack} title={title} >
                <input className="test-input" />
            </Header>);
    });

    it('should contains page title', () => {
        sut.find('.header__title')
            .text().should.equal(title);
    });

    it('should execute  onDiscardClick function by clicking on discard button', () => {
        sut.find('.header__discard').simulate('click');
        expect(goBack.calledOnce).to.equal(true);
    });
});
