import React from 'react';
import { shallow } from 'enzyme';
import ChallengeDetailsMenu from './ChallengeDetailsMenu';
import Menu from '../../Menu';

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

    it('shows title when background visible', () => {
        const title = 'a title';
        wrapper = shallow(<ChallengeDetailsMenu isBgVisible title={title} />);
        wrapper.find(Menu).props().title.should.equal(title);
    });

    it('shows hide title when background invisible', () => {
        const title = 'a title';
        wrapper = shallow(<ChallengeDetailsMenu isBgVisible={false} title={title} />);
        wrapper.find(Menu).props().title.should.equal('');
    });
});
