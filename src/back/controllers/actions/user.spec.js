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
        challengeModel = {
            find: env.stub().returns(challengeModel),
            populate: env.stub().returns(challengeIds)
        };
        user = {
            save: env.stub().returns(saveResult),
            set: env.stub()
        };
        user.get = env.stub().returns(challengeIds);
        sut = proxyquire('./user', {
            '../api/models/challenge': challengeModel
        });
    });

    it('adds challenge to watch list', () => {
        challengeIds = ['id#1', 'id#2'];
        const newId = 'id#3';
        user.get.returns(challengeIds);
        return sut.watchChallenge(env.stub().resolves(user)(), newId)
            .then(() => user.set.should.calledWith(
                'watchList',
                env.match(val => val.should.include.members(challengeIds.concat(newId)))
            ));
    });

    it('removes challenge from watch list', () => {
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
        return sut.unWatchChallenge(userPromise, { toString: () => idToUnWatch })
            .then(() => user.set.should.calledWith('watchList', challengesWithoutUnWatched));
    });

    ['unWatchChallenge', 'watchChallenge'].forEach(method =>
        it(`returns user.save() result on ${method}`, () => {
            const userPromise = { then: env.stub().returns(user) };
            sut[method](userPromise, 'smth').should.equal(user);
        })
    );

    it('uses saved watch list ids', () => {
        const userPromise = env.stub().resolves(user)();
        return sut.getWatchedChallenges(userPromise)
            .then(() => challengeModel.find.should.calledWith({ _id: { $in: challengeIds } }));
    });

    it('returns watched challenges', () => {
        const userPromise = { then: env.stub().returns(user) };
        sut.getWatchedChallenges(userPromise).should.equal(user);
    });
});
