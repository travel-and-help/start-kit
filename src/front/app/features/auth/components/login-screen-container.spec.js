import proxyquire from 'proxyquire';
import { LOGIN_SERVICES } from '../auth.actions';

describe('LoginScreenContainer', () => {
    let reactRedux,
        wrapWithConnect,
        loginScreen,
        authActions,
        dispatch;

    beforeEach(() => {
        dispatch = env.stub().resolves();

        wrapWithConnect = env.stub().returns({});

        reactRedux = {
            connect: env.stub().returns(wrapWithConnect)
        };

        loginScreen = {
            default: Symbol()
        };

        authActions = {
            login: env.stub(),
            skip: env.stub()
        };

        proxyquire('./login-screen-container', {
            'react-redux': reactRedux,
            './login-screen': loginScreen,
            '../auth.actions': authActions
        });
    });

    it('should map state', () => {
        const state = {};
        reactRedux.connect.getCall(0).args[0](state).should.deep.equals({});
    });

    it('should map dispatch to prop method facebookLogin', () => {
        const { facebookLogin } = reactRedux.connect.getCall(0).args[1](dispatch);
        facebookLogin();
        authActions.login.should.calledWith(LOGIN_SERVICES.FACEBOOK);
    });

    it('should map dispatch to prop method googleLogin', () => {
        const { googleLogin } = reactRedux.connect.getCall(0).args[1](dispatch);
        googleLogin();
        authActions.login.should.calledWith(LOGIN_SERVICES.GOOGLE_PLUS);
    });

    it('should map dispatch to prop method skipLogin', () => {
        const { skipLogin } = reactRedux.connect.getCall(0).args[1](dispatch);
        skipLogin();
        authActions.skip.should.calledWith();
    });

});
