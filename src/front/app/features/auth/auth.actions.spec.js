import proxyquire from 'proxyquire';

const chai = require('chai'),
    expect = chai.expect;

describe('action/auth', () => {

    let sut,
        inAppBrowser;

    beforeEach(() => {

        inAppBrowser = {
            open: env.stub()
        };

        sut = proxyquire('./auth.actions', {
            '../../common/in-app-browser': inAppBrowser
        });

    });

    describe('#login', () => {

        it('should export available login services', () => {
            expect(sut.LOGIN_SERVICES).to.exist;
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
                process.env.DOMAIN = 'test';
            });

            it('should export login function', () => {
                expect(loginAction).to.be.an.instanceof(Function);
            });

            it('should open window', () => {
                loginAction(dispatch);
                inAppBrowser.open.should.called;
            });

            it('should open window with facebook endpoint if facebook login', () => {
                loginAction(dispatch);
                inAppBrowser.open.should.calledWith('test/auth/facebook');
            });

            it('should dispatch login attempt on login', () => {
                loginAction(dispatch);
                dispatch.should.calledWith({
                    type: sut.LOGIN_ATTEMPT,
                    service: sut.LOGIN_SERVICES.FACEBOOK
                });
            });

            it('should close window then get response', () => {
                browserWrapper.getBody.returns(env.stub().resolves('')());
                loginAction(dispatch);
                browserWrapper.close.should.calledWiths();
            });

            it('should dispatch login success if response contains token', () => {
                browserWrapper.getBody.returns(
                    env.stub().resolves('{"success":true,"token":"test"}')());
                loginAction(dispatch);
                dispatch.should.calledWith({
                    type: sut.LOGIN_SUCCESS,
                    token: 'test1'
                });
            });

            it('should dispatch login failed if response does not contains token', () => {
                browserWrapper.getBody.returns(env.stub().reject('{"success":false}')());
                loginAction(dispatch);
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
