import proxyquire from 'proxyquire';

describe('LoginScreenContainer', () => {
    let reactRedux,
        wrapWithConnect,
        loginScreen,
        authActions,
        dispatch;

    beforeEach(() => {
        dispatch = env.stub();

        wrapWithConnect = env.stub().returns({});

        reactRedux = {
            connect: env.stub().returns(wrapWithConnect)
        };

        loginScreen = {
            default: Symbol()
        };

        authActions = {
            login: env.stub()
        };

        proxyquire('./login-screen-container', {
            'react-redux': reactRedux,
            './login-screen': loginScreen,
            '../auth.actions': authActions
        });
    });

    it('should map dispatch to prop method facebookLogin', () => {
        const { facebookLogin } = reactRedux.connect.getCall(0).args[1](dispatch);
        facebookLogin();
        authActions.login.should.calledWith('FACEBOOK');
    });

    it('should map dispatch to prop method googleLogin', () => {
        const { googleLogin } = reactRedux.connect.getCall(0).args[1](dispatch);
        googleLogin();
        authActions.login.should.calledWith('GOOGLE_PLUS');
    });

});
