'use strict';

const proxyquire = require('proxyquire').noCallThru();

describe('categories handler', () => {
    let sut;
    let categoryModel;
    let userModel;
    let updateStub;
    let res;
    let req;
    let next;
    let categories;
    let userData;

    beforeEach(() => {
        categories = [
            { _id: 1 },
            { _id: 2 },
            { _id: 3 }
        ];
        categoryModel = {
            find: env.stub()
        };
        userModel = {
            find: env.stub()
        };
        updateStub = env.stub();
        userModel.find.returns({ update: updateStub });
        sut = proxyquire('./categories', {
            '../../../../models/category': categoryModel,
            '../../../../models/user': userModel
        });
        res = {
            json: env.stub(),
            status: env.stub(),
            sendStatus: env.stub()
        };
        userData = {
            _id: 1,
            categories: [1]
        };
        req = {
            body: categories,
            getCurrentUser: env.stub().resolves(userData)
        };
        next = env.stub();

    });

    describe('getAll', () => {
        beforeEach(() => {
        });

        it('should return all categories', () => {
            categoryModel.find.resolves(categories);

            sut.getAll(req, res, next);

            categoryModel.find.should.have.been.calledWith({});
        });

        xit('should pass error to error handler', () => {
            const err = {};

            categoryModel.find.rejects(err);

            sut.getAll(req, res, next);

            next.should.have.been.calledWith(err);
        });
    });

    describe('save', () => {
        let categoryIds;

        beforeEach(() => {
            categoryIds = [1, 2, 3];
        });

        it('should save user categories', () => {
            sut.save(req, res, next).then(() => {
                userModel.find.should.have.been.calledWith();
                updateStub.should.have.been.calledWith(
                    { categories: categoryIds },
                    sinon.match.func
                );
            });
        });

        it('should respond with valid json in case of no errors', () => {
            sut.save(req, res, next).then(() => {
                const updateCallback = updateStub.lastCall.args[1];

                updateCallback();

                res.json.should.have.been.calledWith({ saved: true });
            });
        });

        it('should pass error to error handler', () => {
            sut.save(req, res, next).then(() => {
                const updateCallback = updateStub.lastCall.args[1];
                const error = true;

                updateCallback(error);

                next.should.have.been.calledWith(error);
            });
        });
    });
});
