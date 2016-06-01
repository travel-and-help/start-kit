import React from 'react';
import ChallengeNav from './ChallengeDetailsMenu';
import { shallow } from 'enzyme';

describe('ChallengeDetailsMenu', () => {

    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<ChallengeNav />);
    });

    it('should render div element as a wrapper', () => {
        wrapper.is('div').should.equal(true);
    });

    it('should render div element as a wrapper with a className challenge-nav', () => {
        wrapper.is('.challenge-details-menu').should.equal(true);
    });
});
