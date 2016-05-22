import proxyquire from 'proxyquire';

describe('ChallengeContainer', () => {
    let sut,
        reactRedux,
        dispatch,
        wrapWithConnect,
        challengeActionCreator,
        Challenge;

    beforeEach(() => {
        dispatch = env.stub();

        wrapWithConnect = env.stub().returns({});

        reactRedux = {
            connect: env.stub().returns(wrapWithConnect)
        };

        challengeActionCreator = {
            fetchChallenge: env.stub().returns(Symbol())
        };

        Challenge = {
            default: Symbol()
        };

        sut = proxyquire('./ChallengeContainer', {
            'react-redux': reactRedux,
            '../challenge.actions': challengeActionCreator,
            './Challenge': Challenge
        });
    });

    it('should map state challenge to props challenge', () => {
        const challenge = {};
        const state = { challenge };
        reactRedux.connect.getCall(0).args[0](state).should.contains({ challenge });
    });

    it('should map dispatch to challenge fetching prop method', () => {
        const props = reactRedux.connect.getCall(0).args[1](dispatch);
        props.getChallenge();
        dispatch.should.calledWith(challengeActionCreator.fetchChallenge());
    });

    it('should map to props once', () => {
        reactRedux.connect.should.callCount(1);
    });

    it('should wrap Challenge component', () => {
        wrapWithConnect.should.calledWith(Challenge.default)
            .and
            .callCount(1);
    });

    it('should return react-redux container', () => {
        sut.default.should.equal(wrapWithConnect());
    });
});
