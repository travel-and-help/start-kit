'use strict';

const proxyquire = require('proxyquire').noCallThru();

describe('categories route', () => {
    let categories;
    let restrictUnauthenticated;
    let use;
    let post;
    let get;
    let Router;

    beforeEach(() => {
        categories = {
            getAll: 'smth',
            save: 'smth'
        };
        post = env.stub();
        get = env.stub().returns({ post });
        use = env.stub().returns({ get: get }); // eslint-disable-line
        Router = env.stub().returns({ use });
        proxyquire('./index', {
            express: { Router },
            './categories': categories,
            '../../../auth/auth.service': { restrictUnauthenticated }
        });
    });

    it('should check user authentication', () => {
        use.should.have.been.calledWith(restrictUnauthenticated);
    });

    it('should get all categories for root', () => {
        get.should.have.been.calledWith('/', categories.getAll);
    });

    it('should save categories for POST method', () => {
        post.should.have.been.calledWith('/', categories.save);
    });
});
