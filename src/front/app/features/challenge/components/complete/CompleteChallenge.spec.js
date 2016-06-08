import React from 'react';
import CompleteChallenge from './CompleteChallenge';
import { mount } from 'enzyme';

describe('features/challenge/components/complete/CompleteChallenge', () => {
    let sut;

    beforeEach(() => {
        sut = mount(<CompleteChallenge />);
    });

    it('should contains submit button', () => {
        sut.find('.header__action').text().should.equal('Submit');
    });

});
