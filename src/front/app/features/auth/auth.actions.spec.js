import proxyquire from 'proxyquire';

const chai = require('chai'),
    expect = chai.expect;

describe('action/auth', () => {

    let sut,
        inAppBrowser,
        localStorage;

    beforeEach(() => {

        inAppBrowser = {
            open: env.stub()
        };
        localStorage = {
            set: env.stub(),
            remove: env.stub()
        };

        sut = proxyquire('./auth.actions', {
            '../../common/in-app-browser': inAppBrowser,
            '../../common/local-storage': localStorage
        });

    });

    describe('#login', () => {

        it('should export available login services', () => {
            expect(expect(sut.LOGIN_SERVICES).to.exist);
        });

        describe('login', () => {

            let browserWrapper,
                loginAction,
                dispatch;

            beforeEach(() => {
                browserWrapper = {
                    waitUrl: env.stub().returns(env.stub().resolves()()),
                    getBody: env.stub(),
                    close: env.stub()
                };
                dispatch = env.stub();
                inAppBrowser.open.returns(browserWrapper);
                loginAction = sut.login(sut.LOGIN_SERVICES.FACEBOOK);
                process.env.API_BASE_URL = 'test';
            });

            it('should export login function', () => {
                expect(loginAction).to.be.an.instanceof(Function);
            });

            it('should open window', () => {
                loginAction(dispatch);
                expect(inAppBrowser.open.should.called);
            });

            it('should open window with facebook endpoint if facebook login', () => {
                loginAction(dispatch);
                inAppBrowser.open.should.calledWith('test/auth/facebook');
            });

            it('should open window with google endpoint if google login', () => {
                loginAction = sut.login(sut.LOGIN_SERVICES.GOOGLE_PLUS);
                loginAction(dispatch);
                inAppBrowser.open.should.calledWith('test/auth/google-plus');
            });

            it('should throw if login with not supported service', () => {
                loginAction = sut.login('test');
                expect(() => {
                    loginAction(dispatch);
                }).to.throw(Error);
            });

            it('should dispatch login attempt on login', () => {
                loginAction(dispatch);
                dispatch.should.calledWith({
                    type: sut.LOGIN_ATTEMPT,
                    service: sut.LOGIN_SERVICES.FACEBOOK
                });
            });

            it('should close window then get response', () => {
                browserWrapper.getBody.returns(
                    env.stub().resolves('{"success":true,"token":"test"}')());
                loginAction(dispatch)
                    .finally(() => {
                        expect(browserWrapper.close.should.called);
                    });

            });

            it('should dispatch login success if response contains token', () => {
                browserWrapper.getBody.returns(
                    env.stub().resolves('{"success":true,"token":"test"}')());
                loginAction(dispatch)
                    .finally(() => {
                        dispatch.should.calledWith({
                            type: sut.LOGIN_SUCCESS,
                            token: 'test1'
                        });
                    });
            });

            it('should dispatch login failed if response does not contains token', () => {
                browserWrapper.getBody.returns(env.stub().resolves('{"success":false}')());
                loginAction(dispatch)
                    .finally(() => {
                        dispatch.should.calledWith({
                            type: sut.LOGIN_FAILED,
                            info: {
                                success: false
                            }
                        });
                    });
            });

        });

    });
});
