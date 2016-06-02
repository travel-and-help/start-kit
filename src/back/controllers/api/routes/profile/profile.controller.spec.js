'use strict';
const proxyquire = require('proxyquire').noCallThru(),
    path = require('path'),
    BaseController = require('../../../../common/base.controller'),
    httpMocks = require('node-mocks-http'),
    Q = require('q');

let sut,
    userModel;

describe('controllers/api/ProfileController', () => {

    beforeEach(() => {
        userModel = function ModelStub() {
        };
        userModel.paginate = env.stub();
        userModel.findById = env.stub();
        userModel.prototype.save = env.stub();
        userModel.findByIdAndUpdate = env.stub();
        userModel.remove = env.stub();
        const userPath = path.resolve('./controllers/api/models/user');
        const baseControllerPath = path.resolve('./common/base.controller');

        const ProfileController = proxyquire('./profile.controller', {
            [userPath]: userModel,
            [baseControllerPath]: BaseController
        });
        sut = new ProfileController();

    });

    describe('Method get', () => {

        it('return expected object on get, if success result', (done) => {
            const findPromise = Q.fcall(() => ([
                { test: 'test' }
            ]));
            userModel.paginate.returns(findPromise);
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
                    userModel.paginate.should.calledWith({}, {
                        page: 1,
                        limit: 10,
                        lean: true,
                        select: {
                            photo: 1,
                            fullName: 1,
                            rating: 1
                        }
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
            const userRequestObject = {
                select: env.stub().returns(findPromise)
            };
            userModel.findById.returns(userRequestObject);
            const request = httpMocks.createRequest({
                method: 'GET',
                url: '/',
                params: { id: 42 }
            });
            const response = httpMocks.createResponse();
            sut.getById(request, response)
                .then(() => {
                    userRequestObject.select.should.calledWith({
                        photo: 1,
                        fullName: 1,
                        rating: 1,
                        locations: 1,
                        categories: 1,
                        registerDate: 1,
                        lastLogin: 1,
                        'facebook.id': 2,
                        'google.id': 2
                    });
                    done();
                });
        });

        it('return expected object on get, if success result', (done) => {
            const resultModel = {
                test: 'test',
                facebook: {
                    id: 'testFacebook'
                },
                google: {
                    id: 'testGoogle'
                },
                toObject: env.stub()
            };
            resultModel.toObject.returns(resultModel);
            const findPromise = Q.fcall(() => (resultModel));
            const userRequestObject = {
                select: env.stub().returns(findPromise)
            };
            userModel.findById.returns(userRequestObject);
            const request = httpMocks.createRequest({
                method: 'GET',
                url: '/',
                params: { id: 42 }
            });
            const response = httpMocks.createResponse();
            sut.getById(request, response)
                .then(() => {
                    response.statusCode.should.equal(200);
                    const data = JSON.parse(response._getData());
                    data.should.deep.equal({
                        test: 'test',
                        social: [
                            {
                                type: 'FACEBOOK',
                                url: 'https://www.facebook.com/testFacebook'
                            },
                            {
                                type: 'GOOGLE_PLUS',
                                url: 'https://plus.google.com/testGoogle'
                            }
                        ]
                    });
                    userModel.findById.should.calledWith(42);
                    done();
                });
        });

    });

});
