'use strict';

const proxyquire = require('proxyquire').noCallThru();

describe('categories route', () => {
    it('should get all categories for root', () => {
        const categories = { getAll: 'smth' };
        const get = env.stub();
        const Router = env.stub().returns({ get: get });// eslint-disable-line
        proxyquire('./index', {
            express: { Router },
            './categories': categories
        });
        get.should.have.been.calledWith('/', categories.getAll);
    });
});
