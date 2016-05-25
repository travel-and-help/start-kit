import React from 'react';
import ChallengeDetails from './ChallengeDetails';
import { mount } from 'enzyme';

describe('./ChallengeDetails', () => {

    let sut;

    beforeEach(() => {
        sut = mount(<ChallengeDetails
            title="testTitle"
            level="testLevel"
            description="testDescription"
        />);
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
});
