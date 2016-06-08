const proxyquire = require('proxyquire').noCallThru();

describe('action/categories', () => {
    let sut;
    let dispatch;
    let api;
    let promise;
    const userId = 'userId';
    const challenge = { _id: 1 };
    const challenges = [
        { _id: 1 },
        { _id: 2 }
    ];
    const executeSut = (apiReturnedValue) => {
        promise = env.stub().resolves(apiReturnedValue)();

        api = env.stub().returns(promise);

        return proxyquire('./challenge.actions', {
            '../../common/api': api
        });
    };

    describe('#watchChallenge', () => {
        let fetcher;

        beforeEach(() => {
            sut = executeSut(challenge);
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
            sut = executeSut(challenge);
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
            sut = executeSut(challenge);
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

    describe('#getAcceptedChallenges', () => {
        let fetcher;

        beforeEach(() => {
            sut = executeSut(challenges);
            dispatch = env.spy();
            fetcher = sut.getAcceptedChallenges(userId);
        });

        it('should fetch accepted challenges', () => {
            fetcher(dispatch);
            api.should.have.been
                .calledWith(`/api/challenge/user/${userId}/status/accepted`)
                .and.callCount(1);
        });

        it('should dispatch ACCEPTED_RECEIVED event with data from response', () => {
            fetcher(dispatch);
            return promise.finally(() => {
                const action = dispatch.lastCall.args[0];
                action.should.eqls({
                    type: sut.ACCEPTED_RECEIVED,
                    challenges
                });
            });
        });
    });

    describe('#getWishList', () => {
        let fetcher;

        beforeEach(() => {
            sut = executeSut(challenges);
            dispatch = env.spy();
            fetcher = sut.getWishList();
        });

        it('should fetch wishList challenges', () => {
            fetcher(dispatch);
            api.should.have.been.calledWith('/api/my/wish-list').and.callCount(1);
        });

        it('should dispatch WATCHLIST_RECEIVED event with data from response', () => {
            fetcher(dispatch);
            return promise.finally(() => {
                const action = dispatch.lastCall.args[0];
                action.should.eqls({
                    type: sut.WATCHLIST_RECEIVED,
                    challenges
                });
            });
        });
    });

    describe('#acceptChallenge', () => {
        let fetcher;

        beforeEach(() => {
            sut = executeSut(challenge);
            dispatch = env.spy();
            fetcher = sut.acceptChallenge(challenge._id);
        });

        it('should fetch challenge', () => {
            fetcher(dispatch);
            api.should.have.been
                .calledWith(`/api/my/accepted-challenges/${challenge._id}`)
                .and.callCount(1);
        });

        it('should dispatch ADDED_TO_ACCEPTED_LIST event with data from response', () => {
            fetcher(dispatch);
            return promise.finally(() => {
                const action = dispatch.lastCall.args[0];
                action.should.eqls({
                    type: sut.ADDED_TO_ACCEPTED_LIST,
                    challengeId: challenge._id
                });
            });
        });
    });
});
