'use strict';

const proxyquire = require('proxyquire').noCallThru(),
    expect = require('chai').expect;

describe('auth.service', () => {
    let sut,
        jsonwebtoken,
        expressJWT,
        envValues,
        userModel,
        userInstance;

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
        userInstance = {
            save: env.stub()
        };
        userModel = env.spy(() => (userInstance));
        userModel.findOne = env.stub();
        userModel.findById = env.stub();
        sut = proxyquire('./auth.service', {
            jsonwebtoken,
            'express-jwt': expressJWT,
            '../../../../env': envValues,
            '../api/models/user': userModel
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

    describe('generateOAuth2VerifyCallback', () => {

        const providerProperty = 'testProvided';

        it('should generate verify callback', () => {
            const result = sut.generateOAuth2VerifyCallback(userModel, providerProperty);
            expect(result).to.be.an.instanceof(Function);
        });

        it('should find user by provider property', () => {
            const callback = sut.generateOAuth2VerifyCallback(userModel, providerProperty);
            userModel.findOne.returns(Promise.resolve(null));
            callback('token', '', {
                id: 'profileId'
            }, () => {
            });
            userModel.findOne.should.calledWith({
                'testProvided.id': 'profileId'
            });
        });

        it('should resolve if user exists', (done) => {
            const existingUser = {
                'testProvided.id': 'profileId',
                save: env.stub()
            };
            existingUser.save.returns(Promise.resolve(existingUser));
            userModel.findOne.returns(Promise.resolve(existingUser));
            const callback = sut.generateOAuth2VerifyCallback(userModel, providerProperty);
            callback('token', '', {
                id: 'profileId'
            }, (err, user) => {
                user.lastLogin.toDateString().should.equal((new Date().toDateString()));
                user.should.equal(existingUser);
                done();
            });
        });

        it('should create new user if not exists', (done) => {
            const newUser = {
                'testProvided.id': 'profileId'
            };
            userInstance.save.returns(Promise.resolve(newUser));
            userModel.findOne.returns(Promise.resolve(null));
            const callback = sut.generateOAuth2VerifyCallback(userModel, providerProperty);
            callback('token', '', {
                id: 'profileId',
                photos: [{ value: 'testPhoto' }],
                emails: [{ value: 'testEmail' }],
                displayName: 'test user'
            }, (err, user) => {
                userInstance.fullName.should.equal('test user');
                user.should.equal(newUser);
                done();
            });
        });

        it('should return error on reject', (done) => {
            const error = {
                'testProvided.id': 'profileId'
            };
            userModel.findOne.returns(Promise.reject(error));
            const callback = sut.generateOAuth2VerifyCallback(userModel, providerProperty);
            callback('token', '', {
                id: 'profileId',
                displayName: 'test user'
            }, (err) => {
                err.should.equal(error);
                done();
            });
        });

    });

    describe('isAuthenticated', () => {

        it('should return true if authenticated', () => {
            const req = {
                auth: { id: 'testId' }
            };
            sut.initRequest(req, {}, () => {});
            let result = req.isAuthenticated();
            result.should.equal(true);
            req.auth = {};
            result = req.isAuthenticated();
            result.should.equal(false);
        });

    });

    describe('getCurrentUser', () => {

        it('should return promise', () => {
            const req = {};
            sut.initRequest(req, {}, () => {});
            req.isAuthenticated = () => (false);
            const result = req.getCurrentUser();
            expect(result).to.be.an.instanceof(Promise);
        });

        it('should resolve with current user', (done) => {
            const CurrentUser = {
                _id: 'testId',
                fullName: 'curUser'
            };
            userModel.findById.resolves(CurrentUser);

            const req = {
                auth: {
                    id: 'testId'
                }
            };
            sut.initRequest(req, {}, () => {});
            req.isAuthenticated = () => (true);
            req.getCurrentUser()
                .then((user) => {
                    user.should.equal(CurrentUser);
                })
                .finally(() => {
                    userModel.findById.should.calledWith('testId');
                    done();
                });
        });

        it('should reject if not authenticated', () => {
            const req = {};
            sut.initRequest(req, {}, () => {});
            req.isAuthenticated = () => (false);
            req.getCurrentUser()
                .catch((error) => {
                    expect(error).to.be.an.instanceof(Error);
                });
        });

    });

    describe('restrictUnauthenticated', () => {

        it('should response if unauthenticated', () => {
            const res = {
                status: env.stub().returns({
                    json: env.stub()
                })
            };
            sut.restrictUnauthenticated({
                isAuthenticated: () => (false)
            }, res);
            res.status.should.calledWith(401);
        });

        it('should move next if authenticated', () => {
            const next = env.stub();
            sut.restrictUnauthenticated({
                isAuthenticated: () => (true)
            }, {}, next);
            next.should.calledWith();
        });

    });

});

