import React from 'react';
import CreateFormHeader from './CreateFormHeader';
import { mount } from 'enzyme';

describe('CreateFormHeader', () => {
    let sut;

    beforeEach(() => {
        sut = mount(<CreateFormHeader />);
    });

    it('should contains page title', () => {
        sut.find('.challenge-create-header__title')
            .text().should.equal('Create Challenge');
    });

    it('should contains button with type submit', () => {
        sut.find('.challenge-create-header__post').prop('type').should.equal('submit');

    });
});
