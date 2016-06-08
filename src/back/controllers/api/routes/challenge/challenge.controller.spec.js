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
        userModel = function ModelStub() {
        };
        userModel.aggregate = env.stub();
        challengeModel = function ModelStub() {
        };
        challengeModel.paginate = env.stub();
        challengeModel.findById = env.stub();
        challengeModel.prototype.save = env.stub();
        challengeModel.findByIdAndUpdate = env.stub();
        challengeModel.remove = env.stub();
        const userPath = path.resolve('./controllers/api/models/user');
        const challengePath = path.resolve('./controllers/api/models/challenge');
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

    describe('Method getUsersChallenges', () => {

        let aggregateQuery;

        it('should get users challenges by category', (done) => {
            aggregateQuery = {
                skip: env.spy(() => aggregateQuery),
                limit: env.spy(() => aggregateQuery),
                sort: env.spy(() => aggregateQuery),
                exec: env.spy(() => Q.fcall(() => ({})))
            };
            userModel.aggregate.returns(aggregateQuery);
            const request = httpMocks.createRequest({
                method: 'GET',
                url: '/',
                params: { id: 42 },
                query: {}
            });
            const response = httpMocks.createResponse();
            sut.getUsersChallenges(request, response)
                .then(() => {
                    userModel.aggregate.should.calledWith();
                    aggregateQuery.skip.should.calledWith(0);
                    aggregateQuery.limit.should.calledWith(3);
                    aggregateQuery.sort.should.calledWith({ date: 'desc' });
                    aggregateQuery.exec.should.calledWith();
                    done();
                });
        });

        it('should select challenges with user ids', (done) => {
            const challengeIds = [
                { challenge: 'test1' },
                { challenge: 'test2' },
                { challenge: 'test3' }
            ];
            aggregateQuery = {
                skip: env.spy(() => aggregateQuery),
                limit: env.spy(() => aggregateQuery),
                sort: env.spy(() => aggregateQuery),
                exec: env.spy(() => Q.fcall(() => challengeIds))
            };
            userModel.aggregate.returns(aggregateQuery);
            const request = httpMocks.createRequest({
                method: 'GET',
                url: '/',
                params: { id: 42 },
                query: {
                    page: 2,
                    limit: 4
                }
            });
            const response = httpMocks.createResponse();
            sut.getUsersChallenges(request, response)
                .then(() => {
                    challengeModel.paginate.should.calledWith({
                        _id: { $in: ['test1', 'test2', 'test3'] }
                    });
                    done();
                });
        });

    });
});
