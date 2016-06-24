import React from 'react';
import { render } from 'enzyme';
import Social from './Social';

describe('Social', () => {
    let sut,
        props;

    beforeEach(() => {
        props = {
            url: 'testLink',
            type: 'testTitle'
        };

        sut = render(<Social { ...props } />);
    });

    it('should show logo', () => {
        sut.find('.social').should.have.className('social_testTitle');
    });

    it('should link to profile', () => {
        sut.find('a').should.have.attr('href', props.url);
    });
});
