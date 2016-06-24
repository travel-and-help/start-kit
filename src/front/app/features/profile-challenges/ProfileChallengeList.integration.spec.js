import React from 'react';
import { mount } from 'enzyme';
import { fromJS } from 'immutable';
import proxyquire from 'proxyquire';

describe('ProfileChallengeList', () => {
    let ProfileChallengeList,
        push,
        getChallenges,
        dismiss,
        addToWatchList;
    const user = fromJS({
        id: 1,
        fullName: 'testFullName',
        rating: 1
    });
    const challenges = fromJS([
        {
            _id: 1,
            user: {
                fullName: 'fullName',
                rating: 0
            }
        }
    ]);
    const menuTitle = '';
    beforeEach(() => {
        dismiss = env.spy();
        addToWatchList = env.spy();
        getChallenges = env.spy();
        push = env.spy();
        const reactRouter = {
            hashHistory: { push }
        };

        ProfileChallengeList = proxyquire('./ProfileChallengeList', {
            'react-router': reactRouter
        }).default;
    });

    it('should NOT redirect to login if user is logged in', () => {
        mount(<ProfileChallengeList
            user={ user }
            getChallenges={ getChallenges }
            menuTitle={ menuTitle }
            dismiss={ dismiss }
            addToWatchList={ addToWatchList }
            challenges ={ challenges }
        />);

        const checkExpect = () => push.should.not.been.called;

        checkExpect();
    });
});
