import proxyquire from 'proxyquire';

describe('CompleteChallengeContainer', () => {
    let reactRedux,
        wrapWithConnect,
        completeChallenge;

    beforeEach(() => {
        wrapWithConnect = env.stub().returns({});
        completeChallenge = {
            default: Symbol()
        };
        reactRedux = {
            connect: env.stub().returns(wrapWithConnect)
        };

        proxyquire('./CompleteChallengeContainer', {
            'react-redux': reactRedux,
            './CompleteChallenge': completeChallenge
        });
    });


    it('should map state', () => {
        const state = {
            test: 'test'
        };
        reactRedux.connect.getCall(0).args[0](state).should.deep.equals({});
    });
});
