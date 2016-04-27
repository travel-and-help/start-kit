'use strict';

const proxyquire = require('proxyquire');

describe('challenge topics route', () => {
    it('should get all topics for root', () => {
        const challengeTopics = { getAll: 'smth' };
        const get = env.stub();
        const Router = env.stub().returns({ get });
        proxyquire('./index', {
            express: { Router },
            './challengeTopics': challengeTopics
        });
        get.should.have.been.calledWith('/', challengeTopics.getAll);
    });
});
