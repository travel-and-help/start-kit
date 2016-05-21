'use strict';

const proxyquire = require('proxyquire').noCallThru();

describe('categories route', () => {
    let categories;
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
        Router = env.stub().returns({ get: get });// eslint-disable-line
        proxyquire('./index', {
            express: { Router },
            './categories': categories
        });
    });

    it('should get all categories for root', () => {
        get.should.have.been.calledWith('/', categories.getAll);
    });

    it('should save categories for POST method', () => {
        post.should.have.been.calledWith('/', categories.save);
    });
});
