import React from 'react';
import { render } from 'enzyme';
import { fromJS } from 'immutable';
import Social from './Social';

describe('Profile', () => {
    let social;

    beforeEach(() => {
        social = fromJS({
            url: 'testLink',
            type: 'testTitle'
        });
    });

    it('should render Social with correct title', () => {
        const socialType = social.get('type');
        const cssClass = `user-details__social-icon_${socialType}`;

        const wrapper = render(<Social
            social={ social }
        />);

        const check = () => (wrapper.find(cssClass).text().should.exist);
        check();
    });

    it('should render Social with correct link', () => {
        const wrapper = render(<Social
            social={ social }
        />);
        wrapper.find('a').attr('href').should.equal(social.get('url'));
    });
});
