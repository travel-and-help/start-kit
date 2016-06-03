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
            find: env.stub()
        };
        updateStub = env.stub();
        userModel.find.returns({ update: updateStub });
        sut = proxyquire('./categories', {
            './../../models/category': categoryModel,
            './../../models/user': userModel
        });
    });

    it('should return all data from model', () => {
        sut.getAll();
        categoryModel.find.should.have.been.calledWith({});
    });

    it('should return data as parsed json', () => {
        const res = { json: env.stub() };
        const data = 'data';

        sut.getAll({}, res);

        const onFindCallback = categoryModel.find.lastCall.args[1];

        onFindCallback({}, data);

        res.json.should.have.been.calledWith(data);
    });

    describe('save', () => {
        let categories;
        let categoryIds;
        let req;
        let res;

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
                sendStatus: env.stub(),
                status: env.stub()
            };

            sut.save(req, res);
        });

        it('should save user categories', () => {
            userModel.find.should.have.been.calledWith();
            updateStub.should.have.been.calledWith({ categories: categoryIds }, sinon.match.func);
        });

        it('should respond with status 200 in case of no errors', () => {
            const updateCallback = updateStub.lastCall.args[1];

            updateCallback();

            res.status.should.have.been.calledWith(200);
        });

        it('should send status 500 in case of error', () => {
            const updateCallback = updateStub.lastCall.args[1];
            const error = true;

            updateCallback(error);

            res.sendStatus.should.have.been.calledWith(500);
        });
    });
});
