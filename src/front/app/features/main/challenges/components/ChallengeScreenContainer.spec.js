import proxyquire from 'proxyquire';

describe('app/features/main/challenges ChallengeScreenContainer', () => {
    let sut,
        reactRedux,
        dispatch,
        wrapWithConnect,
        challengesActionCreators,
        ChallengeScreen;

    beforeEach(() => {
        dispatch = env.stub();

        wrapWithConnect = env.stub().returns({});

        reactRedux = {
            connect: env.stub().returns(wrapWithConnect)
        };

        challengesActionCreators = {
            fetchChallenges: env.stub().returns(Symbol())
        };

        ChallengeScreen = {
            default: Symbol()
        };

        sut = proxyquire('./ChallengeScreenContainer', {
            'react-redux': reactRedux,
            '../challenges.actions': challengesActionCreators,
            './ChallengeScreen': ChallengeScreen
        });
    });

    it('should map state challenges to props challenges', () => {
        const challenges = {};
        const state = { challenges };
        reactRedux.connect.getCall(0).args[0](state).should.contains({ challenges });
    });

    it('should map dispatch to challenges fetching prop method', () => {
        const props = reactRedux.connect.getCall(0).args[1](dispatch);
        props.getChallenges();
        dispatch.should.calledWith(challengesActionCreators.fetchChallenges());
    });

    it('should map to props once', () => {
        reactRedux.connect.should.callCount(1);
    });

    it('should wrap ChallengeScreen component', () => {
        wrapWithConnect.should.calledWith(ChallengeScreen.default)
            .and
            .callCount(1);
    });

    it('should return react-redux container', () => {
        sut.default.should.equal(wrapWithConnect());
    });
});
