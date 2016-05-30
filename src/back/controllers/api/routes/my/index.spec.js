'use strict';

const proxyquire = require('proxyquire').noCallThru();

describe('my route', () => {
    let authService,
        my,
        router;

    beforeEach(() => {
        router = [
            'get',
            'delete',
            'use'
        ].reduce((memo, key) => Object.assign(memo, { [key]: env.stub().returns(memo) }), {});
        my = {
            getWatchList: 'a function',
            unWatch: 'another function'
        };
        authService = { restrictUnauthenticated: env.stub() };

        proxyquire('./index', {
            express: { Router: env.stub().returns(router) },
            './my': my,
            '../../../auth/auth.service': authService
        });
    });

    it('GET-s watch list',
        () => router.get.should.have.been.calledWith('/wish-list', my.getWatchList)
    );

    it('DELETE-s challenge',
        () => router.delete.should.have.been.calledWith('/wish-list/:challengeId', my.unWatch)
    );

    it('checks authentication',
        () => router.use.should.have.been.calledWith(authService.restrictUnauthenticated)
    );
});
