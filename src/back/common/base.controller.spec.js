'use strict';

let sut;
let testModel;

const path = require('path');
const BaseController = require(path.resolve('./server/shared/base.controller'));
const httpMocks = require('node-mocks-http');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const $q = require('q');

xdescribe('Base Controller Unit Tests:', () => {
    describe('Method get', () => {

        beforeEach((done) => {
            const testSchema = new Schema({ title: String });
            testModel = mongoose.model('testSchema', testSchema);
            testModel.find = jasmine.createSpy();
            sut = new BaseController(testModel);
            done();
        });

        it('return expected object on get, if success result', (done) => {
            const findPromise = $q.fcall(function () {
                return [{ 'test': 'test' }];
            });
            testModel.find.andReturn(findPromise);
            const request = httpMocks.createRequest({
                method: 'GET',
                url: '/',
                params: { id: 42 }
            });
            const response = httpMocks.createResponse();
            sut.get(request, response)
                .then(() => {
                    const data = JSON.parse(response._getData());
                    expect(response.statusCode).toBe(200);
                    expect(data.status).toBe('success');
                    expect(data.total).toBe(1);
                    expect(data.responses).toEqual([{
                        'test': 'test'
                    }]);
                    expect(testModel.find).toHaveBeenCalledWith({ id: 42 });
                    done();
                });
        });

        it('return expected object on get, if exception', (done) => {
            const findPromise = $q.reject({ 'msg': 'some error' });
            testModel.find.andReturn(findPromise);
            const request = httpMocks.createRequest({
                method: 'GET',
                url: '/',
                params: { id: 4 }
            });
            const response = httpMocks.createResponse();
            sut.get(request, response)
                .then(() => {
                    const data = JSON.parse(response._getData());
                    expect(response.statusCode).toBe(404);
                    expect(data).toEqual({ 'msg': 'some error' });
                    expect(testModel.find).toHaveBeenCalledWith({ id: 4 });
                    done();
                });
        });

        afterEach(() => {
            delete mongoose.models.testSchema;
        });
    });
});
