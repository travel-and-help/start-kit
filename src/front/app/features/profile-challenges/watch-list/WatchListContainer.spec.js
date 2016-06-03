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
            getWatchedChallenges: env.stub().returns('something'),
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
                    getChallenges: env.match.func,
                    dismiss: env.match.func
                }))
        );
    });

    it('maps getChallenges dispatching to props', () => {
        const { getChallenges } = reactRedux.connect.lastCall.args[1](dispatch);
        getChallenges();
        dispatch.should.calledWith(watchListActions.getWatchedChallenges());
    });

    it('maps dismiss dispatching to props', () => {
        const { dismiss } = reactRedux.connect.lastCall.args[1](dispatch);
        dismiss();
        dispatch.should.calledWith(watchListActions.unWatch());
    });

    it('passes challenge to unWatch', () => {
        const { dismiss } = reactRedux.connect.lastCall.args[1](dispatch);
        const challenge = { a: 'challenge' };
        dismiss(challenge);
        watchListActions.unWatch.should.calledWith(challenge);
    });

    it('should return react-redux container', () => sut.default.should.equal(wrapWithConnect()));

    it('passes WatchList to connect', () => {
        wrapWithConnect.should.calledWith(ProfileChallengeList.default);
    });
});