import React from 'react';
import { mount } from 'enzyme';
import { fromJS } from 'immutable';
import ChallengeScreen from './ChallengeScreen';

describe('ChallengeScreen', () => {
    let challengeList,
        getChallenges;

    beforeEach(() => {
        challengeList = fromJS([{
            title: 'JumbtoTitle',
            user: {
                rating: 42,
                firstName: 'John',
                lastName: 'Dou'
            },
            location: 'LA'
        }, {
            title: 'title',
            user: {
                rating: 42,
                firstName: 'Joe',
                lastName: 'Doue'
            },
            location: 'SF'
        }]);

        getChallenges = () => {
        };
    });

    it('should render first challenge in a jumbotron (a test case for full mounting)', () => {
        const wrapper = mount(<ChallengeScreen
          challenges={ challengeList }
          getChallenges={getChallenges}
        />);
        wrapper.find('.topChallenge__title').text()
            .should.equal(challengeList.first().get('title'));
    });
});
