'use strict';

const BaseController = require('./base.controller'),
    httpMocks = require('node-mocks-http'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Q = require('q');

let sut,
    testModel;

describe('BaseController', () => {

    describe('Method get', () => {

        beforeEach(() => {
            const testSchema = new Schema({ title: String });
            testModel = mongoose.model('testSchema', testSchema);
            testModel.paginate = env.stub();
            testModel.findById = env.stub();
            testModel.findByIdAndUpdate = env.stub();
            testModel.remove = env.stub();
            sut = new BaseController(testModel);
        });

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

        afterEach(() => {
            delete mongoose.models.testSchema;
        });
    });
});
