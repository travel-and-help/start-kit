'use strict';

const proxyquire = require('proxyquire').noCallThru();

describe('my controller', () => {
    let sut,
        userActionsService,
        req,
        userPromise,
        res,
        responseBuilder;

    beforeEach(() => {
        userActionsService = {
            getWatchedChallenges: env.stub(),
            watchChallenge: env.stub(),
            unWatchChallenge: env.stub(),
            getCreatedChallenges: env.stub(),
            acceptChallenge: env.stub(),
            getAcceptedChallenges: env.stub(),
            getCompletedChallenges: env.stub()
        };

        userPromise = env.stub().resolves();
        req = {
            getCurrentUser: env.stub().returns(userPromise),
            params: { challengeId: 3 }
        };

        res = env.stubChain(['json', 'status', 'send']);

        responseBuilder = {
            fail: env.stub(),
            ok: env.stub()
        };

        sut = proxyquire('./my', {
            '../../../../services/userActionsService': userActionsService,
            '../../../../common/response-builder': responseBuilder
        });
    });

    [
        { controller: 'getWatchList', model: 'getWatchedChallenges' },
        { controller: 'unWatch', model: 'unWatchChallenge' },
        { controller: 'acceptChallenge', model: 'acceptChallenge' },
        { controller: 'watch', model: 'watchChallenge' },
        { controller: 'getCreatedChallenges', model: 'getCreatedChallenges' },
        { controller: 'getAcceptedChallenges', model: 'getAcceptedChallenges' },
        { controller: 'getCompletedChallenges', model: 'getCompletedChallenges' }
    ].forEach(methods => describe(`${methods.controller}`, () => {
        const controllerMethod = methods.controller;
        const modelMethod = methods.model;

        it('responds with action result', () => {
            const saveResult = 'something';
            const actionPromise = env.stub().resolves(saveResult)();
            userActionsService[modelMethod].returns(actionPromise);
            sut[controllerMethod](req, res);
            return actionPromise
                .then(() => responseBuilder.ok.should.calledWith(res, saveResult));
        });

        it('passes user and challenge id from request to the unWatch action', () => {
            userActionsService[modelMethod].returns(env.stub().resolves()());
            sut[controllerMethod](req);
            userActionsService[modelMethod].should.calledWith(
                userPromise,
                req.params.challengeId
            );
        });

        it('fails on error', done => {
            const error = 'smth went wrong';
            userActionsService[modelMethod].returns(env.stub().rejects(error)());
            sut[controllerMethod](req, res);
            setTimeout(() => {
                responseBuilder.fail.should.calledWith(
                    res,
                    env.match(value => value.toString().indexOf(error))
                );
                done();
            });
        });
    }));
});
