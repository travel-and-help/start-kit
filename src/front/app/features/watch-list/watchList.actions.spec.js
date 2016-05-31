const proxyquire = require('proxyquire').noCallThru();

describe('watchList.actions', () => {
    let sut;
    let dispatch;
    let api;
    let promise;
    const watchList = ['challenges'];

    beforeEach(() => {
        promise = env.stub().resolves(watchList)();
        api = env.stub().returns(promise);
        sut = proxyquire('./watchList.actions', { '../../common/api': api });
    });

    describe('getWatchedChallenges', () => {
        beforeEach(() => {
            dispatch = env.spy();
            sut.getWatchedChallenges()(dispatch);
        });

        it('should fetch watch list', () =>
            api.should.calledWith('/api/my/wish-list').and.callCount(1)
        );

        it('should dispatch categories event with data from response', () => promise
            .finally(() => dispatch.should.calledWith({
                type: 'WATCH_LIST_CHALLENGES_RECEIVED',
                challenges: watchList
            }))
        );
    });

    describe('unWatch', () => {
        let challengeId;
        let challenge;

        beforeEach(() => {
            challengeId = 'someId';
            challenge = { get: env.stub().returns(challengeId) };
            dispatch = env.spy();
        });

        it('deletes challenge from the watch list', () => {
            sut.unWatch(challenge)(dispatch);
            api.should.calledWith(`/api/my/wish-list/${challengeId}`, { method: 'DELETE' });
        });

        it('reloads list after delete', () => {
            sut.unWatch(challenge)(dispatch);
            return promise.finally(() => dispatch.should.calledWith({
                type: 'WATCH_LIST_CHALLENGES_RECEIVED',
                challenges: watchList
            }));
        });

        it('reloads list after delete failed', done => {
            promise = env.stub().rejects('something went wrong')();
            sut.unWatch(challenge)(dispatch);
            setTimeout(() => {
                dispatch.should.calledWith({
                    type: 'WATCH_LIST_CHALLENGES_RECEIVED',
                    challenges: watchList
                });
                done();
            }, 1);
        });
    });
});
