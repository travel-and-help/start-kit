'use strict';

const proxyquire = require('proxyquire').noCallThru();

describe('categories handler', () => {
    let sut;
    let categoryModel;
    let userModel;
    let updateStub;

    beforeEach(() => {
        categoryModel = {
            find: env.stub()
        };
        userModel = {
            find: env.stub(),
            findById: env.stub()
        };
        updateStub = env.stub();
        userModel.find.returns({ update: updateStub });
        sut = proxyquire('./categories', {
            './../../models/category': categoryModel,
            './../../models/user': userModel
        });
    });

    describe('getAll', () => {
        it('should return all categories', () => {
            sut.getAll();

            categoryModel.find.should.have.been.calledWith({});
        });
    });

    describe('getUserSavedCategories', () => {
        let res;
        let req;
        let next;
        let data;
        let userData;
        let onCategoryFindCallback;
        let onUserFindCallback;
        let expectedData;

        beforeEach(() => {
            expectedData = [
                { _id: 1, name: 'name1', checked: true },
                { _id: 2, name: 'name2' }
            ];
            res = {
                json: env.stub(),
                sendStatus: env.stub()
            };
            req = {
                user: { _id: 1 }
            };
            next = env.stub();
            data = [{ _id: 1, name: 'name1' }, { _id: 2, name: 'name2' }];
            userData = {
                categories: [1]
            };

            sut.getUserSavedCategories(req, res, next);

            onCategoryFindCallback = categoryModel.find.lastCall.args[1];

            onCategoryFindCallback({}, data);

            onUserFindCallback = userModel.findById.lastCall.args[1];

            onUserFindCallback({}, userData);
        });

        it('should return all categories', () => {
            categoryModel.find.should.have.been.calledWith({});
        });

        it('should mark user saved categories as checked', () => {
            res.json.should.have.been.calledWith(expectedData);
        });
    });

    describe('save', () => {
        let categories;
        let categoryIds;
        let req;
        let res;
        let next;

        beforeEach(() => {
            categories = [
                { _id: 1 },
                { _id: 2 },
                { _id: 3 }
            ];
            categoryIds = [1, 2, 3];
            req = {
                user: { _id: 1 },
                body: categories
            };
            res = {
                json: env.stub(),
                status: env.stub()
            };
            next = env.stub();

            sut.save(req, res, next);
        });

        it('should save user categories', () => {
            userModel.find.should.have.been.calledWith();
            updateStub.should.have.been.calledWith({ categories: categoryIds }, sinon.match.func);
        });

        it('should respond with valid json in case of no errors', () => {
            const updateCallback = updateStub.lastCall.args[1];

            updateCallback();

            res.json.should.have.been.calledWith({ saved: true });
        });

        it('should pass error to error handler', () => {
            const updateCallback = updateStub.lastCall.args[1];
            const error = true;

            updateCallback(error);

            next.should.have.been.calledWith(error);
        });
    });
});
