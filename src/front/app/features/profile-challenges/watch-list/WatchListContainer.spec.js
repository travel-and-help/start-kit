import proxyquire from 'proxyquire';

describe('WatchListContainer', () => {
    let sut,
        reactRedux,
        wrapWithConnect,
        ProfileChallengeList,
        watchListActions,
        dispatch;

    beforeEach(() => {
        dispatch = env.stub();
        wrapWithConnect = env.stub().returns({});
        reactRedux = { connect: env.stub().returns(wrapWithConnect) };
        ProfileChallengeList = { a: 'watch-list' };
        watchListActions = {
            unWatch: env.stub().returns('anything')
        };
        sut = proxyquire('./WatchListContainer', {
            'react-redux': reactRedux,
            '../ProfileChallengeList': ProfileChallengeList,
            './watchList.actions': watchListActions
        });
    });

    it('maps state and dispatch to props', () => {
        const watchList = ['challenges'];
        const state = { watchList };
        reactRedux.connect.should.calledWith(
            env.match(mapStateToProps => mapStateToProps(state).challenges === watchList),
            env.match(
                mapDispatchToProps => mapDispatchToProps(dispatch).should.all.keys({
                    leftSwipe: env.match.map,
                    rightSwipe: env.match.map
                }))
        );
    });

    it('maps rightSwipe dispatching to props', () => {
        const { rightSwipe } = reactRedux.connect.lastCall.args[1](dispatch);
        rightSwipe.toJS().action();
        dispatch.should.calledWith(watchListActions.unWatch());
    });

    it('passes challenge to unWatch', () => {
        const { rightSwipe } = reactRedux.connect.lastCall.args[1](dispatch);
        const challenge = { a: 'challenge' };
        rightSwipe.toJS().action(challenge);
        watchListActions.unWatch.should.calledWith(challenge);
    });

    it('should return react-redux container', () => sut.default.should.equal(wrapWithConnect()));

    it('passes ProfileChallengeList to connect', () => {
        wrapWithConnect.should.calledWith(ProfileChallengeList.default);
    });
});
