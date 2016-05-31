import proxyquire from 'proxyquire';

describe('WatchListContainer', () => {
    let sut,
        reactRedux,
        wrapWithConnect,
        WatchList,
        watchListActions,
        dispatch;

    beforeEach(() => {
        dispatch = env.stub();
        wrapWithConnect = env.stub().returns({});
        reactRedux = { connect: env.stub().returns(wrapWithConnect) };
        WatchList = { a: 'watch-list' };
        watchListActions = {
            getWatchedChallenges: env.stub().returns('something'),
            unWatch: env.stub().returns('anything')
        };
        sut = proxyquire('./WatchListContainer', {
            'react-redux': reactRedux,
            './WatchList': WatchList,
            '../watchList.actions': watchListActions
        });
    });

    it('maps state and dispatch to props', () => {
        const watchList = ['challenges'];
        const state = { watchList };
        reactRedux.connect.should.calledWith(
            env.match(mapStateToProps => mapStateToProps(state).challenges === watchList),
            env.match(
                mapDispatchToProps => mapDispatchToProps(dispatch).should.all.keys({
                    getWatchedChallenges: env.match.func,
                    unWatchChallenge: env.match.func
                }))
        );
    });

    it('maps getWatchedChallenges dispatching to props', () => {
        const { getWatchedChallenges } = reactRedux.connect.lastCall.args[1](dispatch);
        getWatchedChallenges();
        dispatch.should.calledWith(watchListActions.getWatchedChallenges());
    });

    it('maps unWatchChallenge dispatching to props', () => {
        const { unWatchChallenge } = reactRedux.connect.lastCall.args[1](dispatch);
        unWatchChallenge();
        dispatch.should.calledWith(watchListActions.unWatch());
    });

    it('passes challenge to unWatch', () => {
        const { unWatchChallenge } = reactRedux.connect.lastCall.args[1](dispatch);
        const challenge = { a: 'challenge' };
        unWatchChallenge(challenge);
        watchListActions.unWatch.should.calledWith(challenge);
    });

    it('should return react-redux container', () => sut.default.should.equal(wrapWithConnect()));

    it('passes WatchList to connect', () => wrapWithConnect.should.calledWith(WatchList));
});
