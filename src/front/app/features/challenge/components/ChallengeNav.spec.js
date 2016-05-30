import React from 'react';
import ChallengeNav from './ChallengeNav';
import { shallow } from 'enzyme';

describe('ChallengeNav', () => {

    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<ChallengeNav />);
    });

    it('should render div element as a wrapper', () => {
        wrapper.is('div').should.equal(true);
    });

    it('should render div element as a wrapper with a className challenge-nav', () => {
        wrapper.is('.challenge-nav').should.equal(true);
    });
});
