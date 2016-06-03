import React from 'react';
import ChallengeDetailsMenu from './ChallengeDetailsMenu';
import { mount, shallow } from 'enzyme';

describe('ChallengeDetailsMenu', () => {
    let wrapper;

    it('should render div element as a wrapper', () => {
        wrapper = shallow(<ChallengeDetailsMenu />);
        wrapper.is('div').should.equal(true);
    });

    it('should render div element as a wrapper with a className challenge-nav', () => {
        wrapper = shallow(<ChallengeDetailsMenu />);
        wrapper.is('.challenge-details-menu').should.equal(true);
    });

    it('shows title', () => {
        const title = 'a title';
        wrapper = mount(<ChallengeDetailsMenu isBgVisible="true" title={title} />);
        wrapper.find('.menu__title').at(0).text().should.equal(title);
    });
});
