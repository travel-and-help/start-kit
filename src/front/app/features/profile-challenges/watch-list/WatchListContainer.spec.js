import { Map } from 'immutable';

const proxyquire = require('proxyquire').noCallThru();

describe('WatchListContainer', () => {
    let sut,
        reactRedux,
        wrapWithConnect,
        ProfileChallengeList,
        watchListActions,
        challengeActions,
        dispatch;

    beforeEach(() => {
        dispatch = env.spy(action => {
            if (typeof action === 'function') {
                return action(dispatch);
            }
            return action;
        });
        wrapWithConnect = env.stub().returns({});
        reactRedux = { connect: env.stub().returns(wrapWithConnect) };
        ProfileChallengeList = { a: 'watch-list' };
        watchListActions = {
            load: env.stub().returns('loadWatchListAction'),
            unWatch: env.stub().returns('unWatchAction')
        };

        challengeActions = {
            acceptChallenge: env.stub().resolves()
        };

        sut = proxyquire('./WatchListContainer', {
            'react-redux': reactRedux,
            '../ProfileChallengeList': ProfileChallengeList,
            './watchList.actions': watchListActions,
            '../../challenge/challenge.actions': challengeActions,
            '../../../common/components/loadable': env.stub().returnsArg(0)
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
                    rightSwipe: env.match.map,
                    onLoad: env.match.func
                }))
        );
    });

    describe('when load', () => {

        beforeEach(() => {
            const { onLoad } = reactRedux.connect.lastCall.args[1](dispatch);
            onLoad();
        });

        it('should load watch list', () => {
            dispatch.should.calledWith('loadWatchListAction');
        });
    });

    describe('left swiped action', () => {

        const challengeId = 'challengeId';

        beforeEach(() => {
            const { leftSwipe } = reactRedux.connect.lastCall.args[1](dispatch);
            leftSwipe.toJS().action(new Map({
                _id: challengeId
            }));
        });

        it('should create unwatch challenge action', () => {
            challengeActions.acceptChallenge.should.calledWith(challengeId);
        });

        it('should dispatch unwatch challenge action', () => {
            dispatch.should.calledWith(challengeActions.acceptChallenge());
        });

        context('when challenge accepted', () => {

            let acceptChallengePromise;

            beforeEach(() => {
                acceptChallengePromise = dispatch.firstCall.returnValue;
            });

            it('should create unwatch challenge action', () => acceptChallengePromise
                .then(() => watchListActions.load.should.callCount(1))
            );

            it('should dispatch unwatch challenge action', () => acceptChallengePromise
                .then(() => dispatch.should.calledWith('loadWatchListAction'))
            );

        });
    });

    describe('right swiped action', () => {

        const challenge = 'challenge';

        beforeEach(() => {
            const { rightSwipe } = reactRedux.connect.lastCall.args[1](dispatch);
            rightSwipe.toJS().action(challenge);
        });

        it('should create unwatch challenge action', () => {
            watchListActions.unWatch.should.calledWith(challenge);
        });

        it('should dispatch unwatch challenge action', () => {
            dispatch.should.calledWith('unWatchAction');
        });
    });

    it('should return react-redux container', () => sut.default.should.equal(wrapWithConnect()));

    it('passes ProfileChallengeList to connect', () => {
        wrapWithConnect.should.calledWith(ProfileChallengeList);
    });
});
