const proxyquire = require('proxyquire').noCallThru();

describe('action/categories', () => {
    let sut;
    let dispatch;
    let api;
    let promise;
    const challenge = { _id: 1 };

    beforeEach(() => {

        promise = env.stub().resolves(challenge)();

        api = env.stub().returns(promise);

        sut = proxyquire('./challenge.actions', {
            '../../common/api': api
        });

    });

    describe('#watchChallenge', () => {
        let fetcher;

        beforeEach(() => {
            dispatch = env.spy();
            fetcher = sut.watchChallenge(challenge._id);
        });

        it('should fetch challenge', () => {
            fetcher(dispatch);
            api.should.calledWith(`/api/my/wish-list/${challenge._id}`, { method: 'PUT' });
        });

        it('should dispatch GET_CHALLENGE event with data from response', () => {
            fetcher(dispatch);
            return promise.finally(() => dispatch.should.calledWith({
                type: 'ADDED_TO_WATCHLIST',
                challengeId: challenge._id
            }));
        });
    });

    describe('#fetchChallenge', () => {
        let fetcher;

        beforeEach(() => {

            dispatch = env.spy();

            fetcher = sut.fetchChallenge(challenge._id);
        });

        it('should fetch challenge', () => {
            fetcher(dispatch);
            api.should.have.been.calledWith(`/api/challenge/${challenge._id}`).and.callCount(1);
        });

        it('should dispatch GET_CHALLENGE event with data from response', () => {
            fetcher(dispatch);
            return promise.finally(() => {
                const action = dispatch.lastCall.args[0];
                action.should.eqls({
                    type: sut.GET_CHALLENGE,
                    challenge
                });
            });
        });
    });

    describe('#resetState', () => {
        let reset;

        beforeEach(() => {

            dispatch = env.spy();

            reset = sut.resetState();
        });

        it('should dispatch RESET_STATE event', () => {
            reset(dispatch);
            return promise.finally(() => {
                const action = dispatch.lastCall.args[0];
                action.should.eqls({
                    type: sut.RESET_STATE
                });
            });
        });
    });
});
