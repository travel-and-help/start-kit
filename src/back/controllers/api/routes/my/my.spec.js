'use strict';

const proxyquire = require('proxyquire').noCallThru();
const Q = require('q');

describe('my controller', () => {
    let sut,
        challenge,
        userActions;

    beforeEach(() => {
        challenge = {
            getWatchList: 'a function',
            unWatch: 'another function'
        };
        userActions = {
            getWatchList: env.stub().returns(Q.when())
        };
        sut = proxyquire('./my', {
            './../../models/challenge': challenge,
            './userActions': userActions
        });
    });

    xit('passes user to getWatchList', () => {
        const userPromise = Q.when();
        sut.getWatchList({ getCurrentUser: env.stub().returns(userPromise) });
        userActions.getWatchList.should.have.been.calledWith(userPromise);
    });
});
