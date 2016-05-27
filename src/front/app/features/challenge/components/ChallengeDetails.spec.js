import React from 'react';
import ChallengeDetails from './ChallengeDetails';
import { mount } from 'enzyme';
import { fromJS } from 'immutable';

describe('ChallengeDetails', () => {

    let sut;
    let challenge;

    beforeEach(() => {
        challenge = fromJS({
            title: 'testTitle',
            level: 'testLevel',
            description: 'testDescription',
            user: {
                firstName: 'userName',
                lastName: 'userLastName',
                rating: 1
            }
        });

        sut = mount(<ChallengeDetails challenge={challenge} />);
    });

    it('should show challenge title', () => {
        sut.find('.challenge-info__title')
            .text().should.equal('testTitle');
    });

    it('should show challenge level', () => {
        sut.find('.challenge-info-level__value')
            .text().should.equal('testLevel');
    });

    it('should show challenge description', () => {
        sut.find('.challenge-info__description')
            .text().should.equal('testDescription');
    });

    it('should show user firstName and lastName', () => {
        sut.find('.challenge-info-author__name')
            .text().should.equal('userName userLastName');
    });

    it('should show user rating', () => {
        sut.find('.challenge-info-author__rating-val')
            .text().should.equal('1');
    });
});
