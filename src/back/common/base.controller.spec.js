'use strict';

const BaseController = require('./base.controller'),
    httpMocks = require('node-mocks-http'),
    Q = require('q');

let sut,
    testModel;

describe('BaseController', () => {

    beforeEach(() => {
        testModel = function ModelStub() {
        };
        testModel.paginate = env.stub();
        testModel.findById = env.stub();
        testModel.prototype.save = env.stub();
        testModel.findByIdAndUpdate = env.stub();
        testModel.remove = env.stub();
        sut = new BaseController(testModel);
    });

    describe('Method get', () => {

        it('return expected object on get, if success result', (done) => {
            const findPromise = Q.fcall(() => ([
                { test: 'test' }
            ]));
            testModel.paginate.returns(findPromise);
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
                    testModel.paginate.should.calledWith({}, {
                        page: 0,
                        limit: 10,
                        lean: true
                    });
                    done();
                });
        });

        it('should parse pagination parameters from query', () => {
            const findPromise = Q.fcall(() => 'test');
            testModel.paginate.returns(findPromise);
            const request = httpMocks.createRequest({
                method: 'GET',
                url: '/',
                params: { id: 42 },
                query: {
                    page: 2,
                    limit: 3
                }
            });
            const response = httpMocks.createResponse();
            sut.get(request, response);
            testModel.paginate.should.calledWith({}, {
                page: 2,
                limit: 3,
                lean: true
            });
        });

        it('return expected object on get, if failed result', (done) => {
            const findPromise = Q.reject('error');
            testModel.paginate.returns(findPromise);
            const request = httpMocks.createRequest({
                method: 'GET',
                url: '/',
                params: { id: 42 }
            });
            const response = httpMocks.createResponse();
            sut.get(request, response)
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

    describe('Method add', () => {

        it('return expected object on get, if success result', (done) => {
            const findPromise = Q.fcall(() => ([
                { test: 'test' }
            ]));
            testModel.prototype.save.returns(findPromise);
            const request = httpMocks.createRequest({
                method: 'PUT',
                url: '/',
                body: {
                    title: 'testTitle'
                }
            });
            const response = httpMocks.createResponse();
            sut.add(request, response)
                .then(() => {
                    response.statusCode.should.equal(200);
                    const data = JSON.parse(response._getData());
                    data.should.deep.equal([{
                        test: 'test'
                    }]);
                    testModel.prototype.save.should.calledWith();
                    done();
                });
        });
        it('return expected object on get, if failed result', (done) => {
            const findPromise = Q.reject('error');
            testModel.prototype.save.returns(findPromise);
            const request = httpMocks.createRequest({
                method: 'PUT',
                url: '/',
                body: {
                    title: 'testTitle'
                }
            });
            const response = httpMocks.createResponse();
            sut.add(request, response)
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

    describe('Method getById', () => {

        it('return expected object on get, if success result', (done) => {
            const findPromise = Q.fcall(() => ([
                { test: 'test' }
            ]));
            testModel.findById.returns(findPromise);
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
                    data.should.deep.equal([{
                        test: 'test'
                    }]);
                    testModel.findById.should.calledWith(42);
                    done();
                });
        });

        it('return expected object on get, if failed result', (done) => {
            const findPromise = Q.reject('error');
            testModel.findById.returns(findPromise);
            const request = httpMocks.createRequest({
                method: 'GET',
                url: '/',
                params: { id: 42 }
            });
            const response = httpMocks.createResponse();
            sut.getById(request, response)
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

    describe('Method update', () => {

        it('return expected object on get, if success result', (done) => {
            const findPromise = Q.fcall(() => ([
                { test: 'test' }
            ]));
            testModel.findByIdAndUpdate.returns(findPromise);
            const request = httpMocks.createRequest({
                method: 'GET',
                url: '/',
                params: { id: 42 }
            });
            const response = httpMocks.createResponse();
            sut.update(request, response)
                .then(() => {
                    response.statusCode.should.equal(200);
                    const data = JSON.parse(response._getData());
                    data.should.deep.equal([{
                        test: 'test'
                    }]);
                    testModel.findByIdAndUpdate.should.calledWith(42);
                    done();
                });
        });

        it('return expected object on get, if failed result', (done) => {
            const findPromise = Q.reject('error');
            testModel.findByIdAndUpdate.returns(findPromise);
            const request = httpMocks.createRequest({
                method: 'GET',
                url: '/',
                params: { id: 42 }
            });
            const response = httpMocks.createResponse();
            sut.update(request, response)
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

    describe('Method remove', () => {

        it('return expected object on get, if success result', (done) => {
            const findPromise = Q.fcall(() => ([
                { test: 'test' }
            ]));
            testModel.remove.returns(findPromise);
            const request = httpMocks.createRequest({
                method: 'GET',
                url: '/',
                params: { id: 42 }
            });
            const response = httpMocks.createResponse();
            sut.remove(request, response)
                .then(() => {
                    response.statusCode.should.equal(200);
                    const data = JSON.parse(response._getData());
                    data.should.deep.equal([{
                        test: 'test'
                    }]);
                    testModel.remove.should.calledWith({ _id: 42 });
                    done();
                });
        });

        it('return expected object on get, if failed result', (done) => {
            const findPromise = Q.reject('error');
            testModel.remove.returns(findPromise);
            const request = httpMocks.createRequest({
                method: 'GET',
                url: '/',
                params: { id: 42 }
            });
            const response = httpMocks.createResponse();
            sut.remove(request, response)
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
