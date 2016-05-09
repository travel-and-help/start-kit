'use strict';

const proxyquire = require('proxyquire'),
    expect = require('chai').expect;

describe('auth.service', () => {
    let sut,
        jsonwebtoken,
        expressJWT,
        envValues;

    const expressJWTResult = function expressJWTResult() {
        return () => {
        };
    };

    const token = 'token';
    beforeEach(() => {
        jsonwebtoken = {
            sign: env.spy(() => token)
        };
        expressJWT = env.spy(expressJWTResult);
        envValues = {
            SESSION_SECRET: 'testSecret'
        };
        sut = proxyquire('./auth.service', {
            jsonwebtoken,
            'express-jwt': expressJWT,
            '../../../../env': envValues
        });
    });

    it('should export validateJwt middleware', () => {
        expect(sut.validateJwt).to.be.an.instanceof(Function);
    });

    it('should export responseAuthToken middleware', () => {
        expect(sut.responseAuthToken).to.be.an.instanceof(Function);
    });

    it('should init Jwt middleware', () => {
        expressJWT.should.been.calledWith({
            secret: 'testSecret',
            credentialsRequired: false,
            requestProperty: 'auth'
        });
    });

    describe('responseAuthToken middleware', () => {

        let next,
            req,
            res;

        beforeEach(() => {
            next = env.spy();
            req = {};
            res = {
                json: env.spy()
            };
        });

        it('should return error if where no user in request', () => {
            sut.responseAuthToken(req, res, next);
            next.should.been.calledWith(new Error('Something went wrong, please try again.'));
        });

        it('should response with token if user exists', () => {
            req.user = { _id: 'testId' };
            sut.responseAuthToken(req, res, next);
            jsonwebtoken.sign.should.been.calledWith({ id: 'testId' },
                'testSecret', { expiresIn: 18000 });
            res.json.should.been.calledWith({
                success: true,
                token
            });
        });

    });

});

