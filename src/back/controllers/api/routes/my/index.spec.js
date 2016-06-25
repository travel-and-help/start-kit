'use strict';

const proxyquire = require('proxyquire').noCallThru();
const my = require('./my');

describe('my route', () => {
    let authService,
        router;

    beforeEach(() => {
        router = env.stubChain(['get', 'delete', 'use', 'put']);

        authService = { restrictUnauthenticated: env.stub() };

        proxyquire('./index', {
            express: { Router: env.stub().returns(router) },
            '../../../auth/auth.service': authService
        });
    });

    it('checks authentication',
        () => router.use.should.calledWith(authService.restrictUnauthenticated)
    );

    it('GET-s the watch list',
        () => router.get.should.calledWith('/wish-list', my.getWatchList)
    );

    it('PUT-s into the watch list',
        () => router.put.should.calledWith('/wish-list/:challengeId', my.watch)
    );

    it('DELETE-s a challenge',
        () => router.delete.should.calledWith('/wish-list/:challengeId', my.unWatch)
    );

    it('GET-s accepted challenges',
        () => router.get.should.calledWith('/accepted-challenges', my.getAcceptedChallenges)
    );

    it('PUT-s into accepted challenges',
        () => router.put.should.calledWith('/accepted-challenges/:challengeId', my.acceptChallenge)
    );

    it('GET-s completed challenges',
        () => router.get.should.calledWith('/completed-challenges', my.getCompletedChallenges)
    );
});
