'use strict';

const proxyquire = require('proxyquire').noCallThru();
const chainable = require('../../../../../../test/unit/builders/chainable');

describe('my controller', () => {
    let sut,
        challenge,
        challenges,
        userActions,
        req,
        userPromise,
        res;

    beforeEach(() => {
        challenge = {
            getWatchList: 'a function',
            unWatch: 'another function'
        };
        challenges = [];
        userActions = {
            getWatchedChallenges: env.stub(),
            unWatchChallenge: env.stub()
        };
        userPromise = env.stub().resolves();
        req = {
            getCurrentUser: env.stub().returns(userPromise),
            params: { challengeId: 3 }
        };
        res = chainable(['json', 'status', 'send']);
    });

    describe('unWatch', () => {
        let responseBuilder;

        beforeEach(() => {
            responseBuilder = {
                fail: env.stub(),
                ok: env.stub()
            };
            sut = proxyquire('./my', {
                '../../models/challenge': challenge,
                '../../../actions/user': userActions,
                '../../../../common/response-builder': responseBuilder
            });
        });

        it('responds with action result', () => {
            const saveResult = 'something';
            const unWatchPromise = env.stub().resolves(saveResult)();
            userActions.unWatchChallenge.returns(unWatchPromise);
            sut.unWatch(req, res);
            return unWatchPromise
                .then(() => responseBuilder.ok.should.calledWith(res, saveResult));
        });

        it('passes user and challenge id from request to the unWatch action', () => {
            userActions.unWatchChallenge.returns(env.stub().resolves()());
            sut.unWatch(req);
            userActions.unWatchChallenge.should.calledWith(
                userPromise,
                req.params.challengeId
            );
        });

        it('fails on error', done => {
            const error = 'smth went wrong';
            userActions.unWatchChallenge.returns(env.stub().rejects(error)());
            sut.unWatch(req, res);
            setTimeout(() => {
                responseBuilder.fail.should.calledWith(
                    res,
                    env.match(value => value.toString().indexOf(error))
                );
                done();
            }, 1);
        });
    });

    describe('getWatchList', () => {
        beforeEach(() => {
            sut = proxyquire('./my', {
                '../api/models/challenge': challenge,
                '../../../actions/user': userActions
            });
        });

        it('passes user from request to getWatchList action', () => {
            userActions.getWatchedChallenges.returns(env.stub().resolves()());
            sut.getWatchList(req);
            userActions.getWatchedChallenges.should.calledWith(userPromise);
        });

        it('responds with json-ed challenges', () => {
            const challengesPromise = env.stub().resolves(challenges)();
            userActions.getWatchedChallenges.returns(challengesPromise);
            sut.getWatchList(req, res);
            return challengesPromise
                .then(() => res.json.should.calledWith(challenges));
        });

        describe('when error', () => {
            let error;

            beforeEach(() => {
                error = 'smth went wrong';
                userActions.getWatchedChallenges.returns(env.stub().rejects(error)());
                sut.getWatchList(req, res);
            });

            it('sets code 500', done => {
                setTimeout(() => {
                    res.status.should.calledWith(500);
                    done();
                }, 1);
            });

            it('sends it', done => {
                setTimeout(() => {
                    res.json.should.calledWith(
                        env.match({ error: env.match(value => value.toString().indexOf(error)) })
                    );
                    done();
                }, 1);
            });
        });
    });
});
