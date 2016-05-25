const proxyquire = require('proxyquire').noCallThru();
import React from 'react';
import { mount } from 'enzyme';

describe('app/common/components/challenge/ChallengeTileInfo', () => {

    let sut;
    let rankToType;

    beforeEach(() => {

        rankToType = env.stub().withArgs('1').returns('rankType');

        const ChallengeTileInfo = proxyquire('./ChallengeTileInfo', {
            './rankToType': rankToType
        }).default;

        sut = mount(<ChallengeTileInfo
            title="title"
            userName="userName"
            userRank={1}
            location="location"
            className="class-name"
        />);
    });

    it('should apply passed class to wrapper', () => {
        sut.find('.challenge-tile-info').hasClass('class-name')
            .should.equal(true);
    });

    it('should show user name', () => {
        sut.find('.challenge-tile-info__user-name')
            .text().should.equal('userName');
    });

    it('should show location', () => {
        sut.find('.challenge-tile-info__location')
            .text().should.equal('location');
    });

    it('should show challenge title', () => {
        sut.find('.challenge-tile-info__title')
            .text().should.equal('title');
    });

    it('should show user rank type', () => {
        sut.find('.challenge-tile-info__user-rank.challenge-tile-info__user-rank_rankType')
            .text().should.equal('1');
    });

});
