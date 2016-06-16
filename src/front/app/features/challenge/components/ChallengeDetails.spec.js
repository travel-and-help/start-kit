import React from 'react';
import ChallengeDetails from './ChallengeDetails';
import { mount } from 'enzyme';
import { fromJS } from 'immutable';

describe('ChallengeDetails', () => {

    let sut;
    let challenge;

    beforeEach(() => {
        challenge = fromJS({
            image: '',
            title: 'testTitle',
            level: 'testLevel',
            description: '',
            categories: [],
            location: '',
            user: {
                firstName: 'userName',
                lastName: 'userLastName'
            }
        });

        sut = mount(<ChallengeDetails challenge={challenge} />);
    });

    it('should show challenge title', () => {
        sut.find('.challenge-header__title')
            .text().should.equal('testTitle');
    });

    it('should show challenge level', () => {
        sut.find('.challenge-info-level').find('.challenge-info__text')
            .text().should.equal('testLevel');
    });

    it('should show user firstName and lastName', () => {
        sut.find('.challenge-info-author').find('.challenge-info__text')
            .text().should.equal('userName userLastName');
    });
});
