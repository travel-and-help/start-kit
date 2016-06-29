import { WATCH_LIST_CHALLENGES_RECEIVED } from './watchList.actions';
const proxyquire = require('proxyquire').noCallThru();

describe('watchList.actions', () => {
    let sut;
    let dispatch;
    let push;
    let api;
    let result;
    const watchList = ['challenges'];

    beforeEach(() => {
        dispatch = env.spy(action => {
            if (typeof action === 'function') {
                return action(dispatch);
            }
            return action;
        });

        push = env.stub();

        api = env.stub().resolves(watchList);
        sut = proxyquire('./watchList.actions', {
            'react-router-redux': {
                push
            },
            '../../../common/api': api
        });
    });

    describe('navigate', () => {

        beforeEach(() => {
            push.returns('navigateToWatchListAction');
            result = sut.navigate();
        });

        it('should create navigate to watch list action', () => {
            push.should.calledWith('profile/watch-list');
        });

        it('should return action', () => {
            result.should.equal('navigateToWatchListAction');
        });

    });

    describe('unWatch', () => {
        let challengeId;
        let challenge;

        beforeEach(() => {
            challengeId = 'someId';
            challenge = { get: env.stub().returns(challengeId) };
            result = sut.unWatch(challenge)(dispatch);
        });

        it('deletes challenge from the watch list', () => {
            api.should.calledWith(`/api/my/wish-list/${challengeId}`, { method: 'DELETE' });
        });

        it('reloads load watch list after delete', () => result
            .then(() => {
                dispatch.should.calledWith({
                    type: WATCH_LIST_CHALLENGES_RECEIVED,
                    challenges: watchList
                });
            })
        );

        it('reloads list after delete failed', () => {
            api.withArgs(`/api/my/wish-list/${challengeId}`, { method: 'DELETE' })
                .rejects('something went wrong');
            return result.then(() => dispatch.should.calledWith({
                type: WATCH_LIST_CHALLENGES_RECEIVED,
                challenges: watchList
            }));
        });
    });
});
