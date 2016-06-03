'use strict';

const proxyquire = require('proxyquire').noCallThru();
const chainable = require('../../../../../../test/unit/builders/chainable');

describe('my route', () => {
    let authService,
        my,
        router;

    beforeEach(() => {
        router = chainable(['get', 'delete', 'use', 'put']);
        my = {
            getWatchList: 'a function',
            unWatch: 'another function',
            watch: '3rd function'
        };
        authService = { restrictUnauthenticated: env.stub() };

        proxyquire('./index', {
            express: { Router: env.stub().returns(router) },
            './my': my,
            '../../../auth/auth.service': authService
        });
    });

    it('GET-s the watch list',
        () => router.get.should.calledWith('/wish-list', my.getWatchList)
    );

    it('PUT-s into the watch list',
        () => router.put.should.calledWith('/wish-list/:challengeId', my.watch)
    );

    it('DELETE-s a challenge',
        () => router.delete.should.calledWith('/wish-list/:challengeId', my.unWatch)
    );

    it('checks authentication',
        () => router.use.should.calledWith(authService.restrictUnauthenticated)
    );
});
