import proxyquire from 'proxyquire';
import { List } from 'immutable';

describe('app/features/main/challenges ChallengeScreenContainer', () => {
    let sut,
        reactRedux,
        state,
        dispatch,
        wrapWithConnect,
        challengesActionCreators,
        ChallengeScreen,
        mapStateToProps,
        mapDispatchToProps;

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

        mapStateToProps = reactRedux.connect.getCall(0).args[0];
        mapDispatchToProps = reactRedux.connect.getCall(0).args[1];

        state = { challenges: new List([1, 2]) };
    });

    it('should map state challenges to props challenges', () => {
        mapStateToProps(state).challenges.toJS().should.deep.equal([2]);
    });

    it('should map first challenge as top challenge', () => {
        mapStateToProps(state).topChallenge.should.equal(1);
    });

    it('should map dispatch to challenges fetching prop method', () => {
        const props = mapDispatchToProps(dispatch);
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
