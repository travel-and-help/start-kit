import React from 'react';
import Profile from './Profile';
import ChallengeStats from './stats/ChallengeStatsContainer';
import { shallow } from 'enzyme';

describe('Profile', () => {
    let sut,
        props;

    beforeEach(() => {
        props = {
            profile: {
                social: [],
                fullName: 'Name',
                photo: 'photo',
                rating: 100
            },
            onWatchListClick: env.stub()
        };

        sut = shallow(<Profile {...props} />);
    });

    it('should raise onWatchListClick when user click on watch list', () => {
        sut.find('.profile__watchlist-link').simulate('click');
        props.onWatchListClick.should.have.callCount(1);
    });

    it('should render correct user`s fullName', () => {
        sut.find('.profile__full-name')
            .text().should.equal(props.profile.fullName);
    });

    it('should show challenges statistics', () => {
        sut.should.contain(<ChallengeStats />);
    });

});
