import proxyquire from 'proxyquire';
import { fromJS } from 'immutable';

describe('ChallengeContainer', () => {
    let sut,
        reactRedux,
        dispatch,
        wrapWithConnect,
        challengeActionCreator,
        Challenge,
        id;

    beforeEach(() => {
        id = 'a1';

        dispatch = env.stub();

        wrapWithConnect = env.stub().returns({});

        reactRedux = {
            connect: env.stub().returns(wrapWithConnect)
        };

        challengeActionCreator = {
            fetchChallenge: env.stub().returns(Symbol()),
            resetState: env.stub().returns(),
            watchChallenge: env.stub()
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
        const userId = 'userId';
        const challenge = fromJS({
            user: {
                id: userId
            }
        });
        const auth = {
            get: env.stub().returns(userId)
        };
        const state = { challenge, auth };
        reactRedux.connect.getCall(0).args[0](state).should.contains({ challenge, userId });
    });

    it('should map dispatch to challenge fetching prop method', () => {
        const props = reactRedux.connect.getCall(0).args[1](dispatch);
        props.getChallenge(id);
        dispatch.should.calledWith(challengeActionCreator.fetchChallenge(id));
    });

    describe('on watch action', () => {
        let challengeId,
            watchAction;

        beforeEach(() => {
            challengeId = 'someChallengeId';
            watchAction = 'an action';
            challengeActionCreator.watchChallenge.returns(watchAction);
        });

        it('calls dispatch', () => reactRedux.connect.should.calledWith(
            env.match.any,
            env.match(mapDispatchToProps => {
                mapDispatchToProps(dispatch).onWatchChallenge(challengeId);
                return dispatch.should.calledWith(watchAction);
            })
        ));

        it('passes challenge id', () => reactRedux.connect.should.calledWith(
            env.match.any,
            env.match(mapDispatchToProps => {
                mapDispatchToProps(dispatch).onWatchChallenge(challengeId);
                return challengeActionCreator.watchChallenge.should.calledWith(challengeId);
            })
        ));
    });

    it('should map dispatch to reset state prop method', () => {
        const props = reactRedux.connect.getCall(0).args[1](dispatch);
        props.getInitialState();
        dispatch.should.calledWith(challengeActionCreator.resetState());
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
