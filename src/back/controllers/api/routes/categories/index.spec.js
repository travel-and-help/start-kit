'use strict';

const proxyquire = require('proxyquire').noCallThru();

describe('categories route', () => {
    let categories;
    let restrictUnauthenticated;
    let router;

    beforeEach(() => {
        categories = {
            getAll: 'smth',
            save: 'smth'
        };

        router = {
            use: env.spy(() => router),
            get: env.spy(() => router),
            post: env.spy(() => router),
            route: env.spy(() => router)
        };

        const express = {
            Router: env.stub().returns(router)
        };

        proxyquire('./index', {
            express,
            './categories': categories,
            '../../../auth/auth.service': { restrictUnauthenticated }
        });
    });

    it('should get all categories for root', () => {
        router.get.should.have.been.calledWith(categories.getAll);
    });

    it('should save categories for authenticated users', () => {
        router.post.should.have.been.calledWith(restrictUnauthenticated, categories.save);
    });
});
