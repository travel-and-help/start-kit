import React from 'react';
import { render, mount } from 'enzyme';
import { fromJS, Map } from 'immutable';
import Profile from './Profile';

describe('Profile', () => {
    let user,
        getUser,
        acceptedChallenges;

    beforeEach(() => {

        acceptedChallenges = [
            {
                status: 'accepted',
                challenge: {
                    user: {}
                }
            },
            {
                status: 'accepted',
                challenge: {
                    user: {}
                }
            }
        ];

        user = fromJS({
            challenges: [
                ...acceptedChallenges,
                {
                    status: 'created',
                    challenge: {
                        user: {}
                    }
                },
                {
                    status: 'completed',
                    challenge: {
                        user: {}
                    }
                }
            ],
            categories: [],
            locations: [],
            web: [],
            firstName: 'testFirstName',
            lastName: 'testLastName',
            photo: 'testPhoto',
            rating: 1
        });

        getUser = env.spy();
    });

    it('should NOT render UserDetials Component if there is NO User', () => {
        user = new Map();
        const wrapper = render(<Profile
            user={ user }
            getUser={ getUser }
        />);
        wrapper.find('.user-details').length.should.equal(0);
    });

    it('should get User when mounted ONCE', () => {
        user = new Map();
        mount(<Profile user={ user } getUser={ getUser } />);
        getUser.should.been.callCount(1);
    });


    describe('Render', () => {
        let wrapper;
        beforeEach(() => {
            wrapper = render(<Profile
                user={ user }
                getUser={ getUser }
            />);
        });

        it('should render UserDetials Component if there is User', () => {
            wrapper
                .find('.user-details').length.should.equal(1);
        });

        it('should render correct user`s fullName', () => {
            wrapper
                .find('.user-details__full-name')
                .text().should.equal(`${user.get('firstName')}${user.get('lastName')}`);
        });

        it('should render correct number of challenges', () => {
            wrapper
                .find('.challenge')
                .length.should.equal(user.get('challenges').size);
        });

        it('should render correct number of filtered challenges', () => {
            wrapper
                .find('.user-details__challenges-container_accepted')
                .find('.challenge')
                .length.should.equal(acceptedChallenges.length);
        });
    })
});
