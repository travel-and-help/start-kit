import React from 'react';
import ChallengeTile from './ChallengeTile';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';

describe('ChallengeTile', () => {
    let challengeMap;

    beforeEach(() => {
        challengeMap = fromJS({
            title: 'title',
            user: {
                rating: 42,
                fullName: 'John Dou'
            },
            location: 'LA'
        });
    });

    it('should render tile element (a sample testcase for a shallow mounting)', () => {
        const wrapper = shallow(<ChallengeTile challenge={ challengeMap } />);
        wrapper.is('Swipeable').should.equal(true);
    });
});
