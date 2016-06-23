'use strict';

const proxyquire = require('proxyquire').noCallThru();

describe('services/userActionsService', () => {
    const saveResult = 'saveResult';
    const getByStatusResult = 'getByStatusResult';
    const challengesServiceFindRangeResult = 'challengesServiceFindRangeResult';
    const challengesServiceFindResult = 'challengesServiceFindResult';

    let challengeIds;
    let sut;
    let user$;
    let user;
    let userChallengesService;
    let challengesService;
    let result;

    beforeEach(() => {

        challengeIds = ['1', '2'];

        challengesService = {
            findRange: env.stub().returns(challengesServiceFindRangeResult),
            find: env.stub().returns(challengesServiceFindResult)
        };

        user = {
            _id: '_id',
            watchList: 'watchList',
            save: env.stub().returns(saveResult),
            set: env.stub(),
            get: env.stub().returns(challengeIds)
        };

        user$ = env.stub().resolves(user)();

        userChallengesService = {
            getByStatus: env.stub().returns(getByStatusResult)
        };

        sut = proxyquire('./userActionsService', {
            './challengesService': challengesService,
            './userChallengesService': userChallengesService
        });
    });

    it('adds challenge to watch list', () => {
        challengeIds = ['id#1', 'id#2'];
        const newId = 'id#3';
        user.get.withArgs('watchList').returns(challengeIds);
        return sut.watchChallenge(user$, newId)
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
        return sut.unWatchChallenge(user$, { toString: () => idToUnWatch })
            .then(() => user.set.should.calledWith('watchList', challengesWithoutUnWatched));
    });

    ['unWatchChallenge', 'watchChallenge'].forEach(method =>
        it(`returns user.save() result on ${method}`, () => {
            const userPromise = { then: env.stub().returns(user$) };
            sut[method](userPromise, 'smth').should.equal(user$);
        })
    );

    describe('watch list', () => {

        beforeEach(() => {
            result = sut.getWatchedChallenges(user$);
        });

        it('should find user watch list', () => result.then(() => {
            challengesService.findRange.should.calledWith(user.watchList);
        }));

    });

    describe('completed challenges', () => {

        beforeEach(() => {
            result = sut.getCompletedChallenges(user$);
        });

        it('should get user challenges with completed status', () => {
            userChallengesService.getByStatus.should.been.calledWith(user$, 'completed');
        });

        it('should return result', () => {
            result.should.equal(getByStatusResult);
        });

    });

    describe('accepted challenges', () => {

        beforeEach(() => {
            result = sut.getAcceptedChallenges(user$);
        });

        it('should get user challenges with completed status', () => {
            userChallengesService.getByStatus.should.been.calledWith(user$, 'accepted');
        });

        it('should return result', () => {
            result.should.equal(getByStatusResult);
        });

    });

    describe('accept challenge', () => {

    });

    describe('created challenges', () => {

        beforeEach(() => {
            result = sut.getCreatedChallenges(user$);
        });

        it('should find user challenges', () => result.then(() => {
            challengesService.find.should.calledWith({ user: user._id });
        }));

    });
});
