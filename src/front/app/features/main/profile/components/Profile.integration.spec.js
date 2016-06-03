import React from 'react';
import { render, mount } from 'enzyme';
import { fromJS, Map } from 'immutable';
import Profile from './Profile';

describe('Profile', () => {
    let user,
        getUser,
        getChallenges,
        acceptedChallenges;

    beforeEach(() => {

        acceptedChallenges = [
            { user: {} },
            { user: {} },
            { user: {} },
            { user: {} }
        ];

        user = fromJS({
            acceptedChallenges,
            createdChallenges: [
                { user: {} },
                { user: {} },
                { user: {} }
            ],
            completedChallenges: [
                { user: {} },
                { user: {} }
            ],
            social: [],
            fullName: 'testFullName',
            photo: 'testPhoto',
            rating: 1
        });

        getChallenges = env.spy();
        getUser = env.spy();
    });

    it('should NOT render UserDetials Component if there is NO User', () => {
        user = new Map();
        const wrapper = render(<Profile
            user={ user }
            getUser={ getUser }
            getChallenges={ getChallenges }
        />);
        wrapper.find('.user-details').length.should.equal(0);
    });

    it('should get User when mounted ONCE', () => {
        user = new Map();
        mount(<Profile
            user={ user }
            getUser={ getUser }
            getChallenges={ getChallenges }
        />);
        getUser.should.been.callCount(1);
    });


    describe('Render', () => {
        let wrapper;
        beforeEach(() => {
            wrapper = render(<Profile
                user={ user }
                getUser={ getUser }
                getChallenges={ getChallenges }
            />);
        });

        it('should render UserDetials Component if there is User', () => {
            wrapper
                .find('.user-details').length.should.equal(1);
        });

        it('should render correct user`s fullName', () => {
            wrapper
                .find('.user-details__full-name')
                .text().should.equal(user.get('fullName'));
        });

        it('should render correct number of challenges', () => {
            const expectedSize = user.get('acceptedChallenges').size +
                user.get('completedChallenges').size + user.get('createdChallenges').size;
            wrapper
                .find('.challenge-tile')
                .length.should.equal(expectedSize);
        });

        it('should render correct number of filtered challenges', () => {
            wrapper
                .find('.user-details__challenges-section_accepted')
                .find('.challenge-tile')
                .length.should.equal(acceptedChallenges.length);
        });
    });
});
