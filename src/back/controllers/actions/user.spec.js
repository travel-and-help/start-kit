'use strict';

const proxyquire = require('proxyquire').noCallThru();

describe('user actions service', () => {
    let sut;
    let challengeModel;
    let challengeIds;
    let user;
    let saveResult;

    beforeEach(() => {
        challengeIds = ['id#1'];
        saveResult = 'something has been saved... or not';
        challengeModel = { find: env.stub().returns(challengeIds) };
        user = {
            save: env.stub().returns(saveResult),
            set: env.stub()
        };
        user.get = env.stub().returns(challengeIds);
        sut = proxyquire('./user', {
            '../api/models/challenge': challengeModel
        });
    });

    it('removes challenge from watch list', done => {
        const idToUnWatch = 'id#3';
        challengeIds = ['id#1', 'id#2', { toString: () => idToUnWatch }, 'id#4'];
        user.get.returns(challengeIds);
        const challengesWithoutUnWatched = [];
        challengeIds.forEach(challengeId => {
            if (`${challengeId}` !== idToUnWatch) {
                challengesWithoutUnWatched.push(challengeId);
            }
        });
        const userPromise = env.stub().resolves(user)();
        sut.unWatchChallenge(userPromise, { toString: () => idToUnWatch })
            .then(() => {
                user.set.should.have.been.calledWith('watchList', challengesWithoutUnWatched);
                done();
            });
    });

    it('returns save result', () => {
        const userPromise = { then: env.stub().returns(user) };
        sut.unWatchChallenge(userPromise, 'smth').should.equal(user);
    });

    it('uses saved watch list ids', done => {
        const userPromise = env.stub().resolves(user)();
        sut.getWatchedChallenges(userPromise)
            .then(() => {
                challengeModel.find.should.have.been.calledWith({ _id: { $in: challengeIds } });
                done();
            });
    });

    it('returns watched challenges', () => {
        const userPromise = { then: env.stub().returns(user) };
        sut.getWatchedChallenges(userPromise).should.equal(user);
    });
});
