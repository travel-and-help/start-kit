'use strict';
const proxyquire = require('proxyquire').noCallThru(),
    path = require('path'),
    BaseController = require('../../../../common/base.controller'),
    httpMocks = require('node-mocks-http'),
    Q = require('q');

let sut,
    userModel,
    challengeModel;

describe('controllers/api/ChallengeController', () => {

    beforeEach(() => {
        userModel = env.stub();
        userModel.aggregate = env.stub();
        challengeModel = env.stub();
        challengeModel.paginate = env.stub();
        challengeModel.findById = env.stub();
        challengeModel.prototype.save = env.stub();
        challengeModel.findByIdAndUpdate = env.stub();
        challengeModel.remove = env.stub();
        const userPath = path.resolve('./models/user');
        const challengePath = path.resolve('./models/challenge');
        const baseControllerPath = path.resolve('./common/base.controller');

        const ProfileController = proxyquire('./challenge.controller', {
            [userPath]: userModel,
            [challengePath]: challengeModel,
            [baseControllerPath]: BaseController
        });
        sut = new ProfileController();

    });

    describe('Method get', () => {

        it('return expected object on get, if success result', (done) => {
            const findPromise = Q.fcall(() => ([
                { test: 'test' }
            ]));
            challengeModel.paginate.returns(findPromise);
            const request = httpMocks.createRequest({
                method: 'GET',
                url: '/',
                params: { id: 42 }
            });
            const response = httpMocks.createResponse();
            sut.get(request, response)
                .then(() => {
                    response.statusCode.should.equal(200);
                    const data = JSON.parse(response._getData());
                    data.should.deep.equal([{
                        test: 'test'
                    }]);
                    challengeModel.paginate.should.calledWith({}, {
                        page: 1,
                        limit: 10,
                        lean: true,
                        select: {
                            title: 1,
                            level: 1,
                            image: 1,
                            location: 1,
                            categories: 1,
                            user: 1
                        },
                        populate: 'user'
                    });
                    done();
                });
        });

    });

    describe('Method getById', () => {

        it('should provide expected propetries for query', (done) => {
            const resultModel = {
                test: 'test',
                toObject: env.stub()
            };
            resultModel.toObject.returns(resultModel);
            const findPromise = Q.fcall(() => (resultModel));
            const returnPopulate = {
                populate: env.stub().returns(findPromise)
            };
            const challengeRequestObject = {
                select: env.stub().returns(returnPopulate)
            };
            challengeModel.findById.returns(challengeRequestObject);
            const request = httpMocks.createRequest({
                method: 'GET',
                url: '/',
                params: { id: 42 }
            });
            const response = httpMocks.createResponse();
            sut.getById(request, response)
                .then(() => {
                    challengeRequestObject.select.should.calledWith({
                        title: 1,
                        description: 1,
                        level: 1,
                        image: 1,
                        location: 1,
                        categories: 1,
                        user: 1
                    });
                    done();
                });
        });

    });

    describe('Method complete', () => {

        it('should complete challenge for current user', (done) => {
            const request = httpMocks.createRequest({
                method: 'POST',
                url: '/',
                params: { id: 42 }
            });
            const userInstance = {
                completeChallenge: env.stub().resolves()
            };

            request.getCurrentUser = env.stub().resolves(userInstance);
            const response = httpMocks.createResponse();
            sut.complete(request, response)
                .then(() => {
                    userInstance.completeChallenge.should.calledWith(42);
                    done();
                });
        });

    });

    describe('Method search', () => {

        it('should return challenges without parameters', (done) => {
            challengeModel.findById.resolves({
                categories: 'testCategory',
                location: 'testLocation'
            });
            challengeModel.paginate.resolves([
                { test: 'test' }
            ]);
            const request = httpMocks.createRequest({
                method: 'GET',
                url: '/search'
            });
            const response = httpMocks.createResponse();
            sut.search(request, response)
                .then(() => {
                    response.statusCode.should.equal(200);
                    done();
                });
        });

        it('should search similar challenges', (done) => {
            challengeModel.findById.resolves({
                categories: 'testCategory',
                location: 'testLocation'
            });
            challengeModel.paginate.resolves([
                { test: 'test' }
            ]);
            const request = httpMocks.createRequest({
                method: 'GET',
                url: '/search',
                query: { similar: 42 }
            });
            const response = httpMocks.createResponse();
            sut.search(request, response)
                .then(() => {
                    response.statusCode.should.equal(200);
                    challengeModel.findById.should.calledWith(42);
                    challengeModel.paginate.should.calledWith({
                        $or: [{ categories: 'testCategory' }, { location: 'testLocation' }]
                    });
                    done();
                });
        });

        it('return expected object on get, if failed result', (done) => {
            const findPromise = Q.reject('error');
            challengeModel.findById.returns(findPromise);
            challengeModel.paginate.resolves([
                { test: 'test' }
            ]);
            const request = httpMocks.createRequest({
                method: 'GET',
                url: '/search',
                query: { similar: 42 }
            });
            const response = httpMocks.createResponse();
            sut.search(request, response)
                .then(() => {
                    response.statusCode.should.equal(500);
                    const data = JSON.parse(response._getData());
                    data.should.deep.equal({
                        error: 'error'
                    });
                    done();
                });
        });

    });

});
