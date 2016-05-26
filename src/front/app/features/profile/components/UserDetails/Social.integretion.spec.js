import React from 'react';
import { render } from 'enzyme';
import { fromJS } from 'immutable';
import Social from './Social';

describe('Profile', () => {
    let social;

    beforeEach(() => {
        social = fromJS({
            link: 'testLink',
            title: 'testTitle'
        })
    });

    it('should render Social with correct title', () => {
        const wrapper = render(<Social
            social={ social }
        />);
        wrapper.find('a').text().should.equal(social.get('title'));
    });

    it('should render Social with correct link', () => {
        const wrapper = render(<Social
            social={ social }
        />);
        wrapper.find('a').attr('href').should.equal(social.get('link'));
    });
});
