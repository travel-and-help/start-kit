import proxyquire from 'proxyquire';

import React from 'react';
import { mount } from 'enzyme';
import { fromJS } from 'immutable';

const reactRouter = { hashHistory: {} };
const WatchList = proxyquire('./WatchList', {
    'react-router': reactRouter
}).default;

describe('WatchList', () => {
    let challenges,
        getWatchedChallenges,
        unWatchChallenge,
        wrapper,
        challengeTitles;

    beforeEach(() => {
        reactRouter.hashHistory.goBack = env.stub();
        challengeTitles = ['Feed a homeless person', 'Just do it!'];
        challenges = fromJS(challengeTitles.map(aChallenge));

        getWatchedChallenges = env.stub();
        unWatchChallenge = env.stub();

        wrapper = mount(<WatchList
            challenges={ challenges }
            getWatchedChallenges={ getWatchedChallenges }
            unWatchChallenge={ unWatchChallenge }
        />);
    });

    it('has back button', () => {
        wrapper.find('button').text().should.contain('keyboard_arrow_left');
    });

    it('navigates back', () => {
        const button = wrapper.find('button.challenge-nav__item_back');
        button.simulate('click');
        // eslint-disable-next-line no-unused-expressions
        reactRouter.hashHistory.goBack.should.have.been.called;
    });

    it('shows challenge', () => {
        wrapper.text().should.include.all(...challengeTitles);
    });

    function aChallenge(title) {
        return {
            title,
            user: { rating: 1 }
        };
    }
});
