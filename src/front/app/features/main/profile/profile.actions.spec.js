const proxyquire = require('proxyquire').noCallThru();

describe('action/profile', () => {
    let sut;
    let dispatch;
    let api;
    let fetcher;
    let promise;
    let user;
    let userId;
    let challenges;
    let challengesResponse;
    let executeSut;

    beforeEach(() => {
        user = {
            name: 'mockName'
        };

        challenges = [];

        challengesResponse = {
            docs: challenges
        };

        userId = 'testId';

        dispatch = env.spy();

        executeSut = (returnValue) => {
            promise = env.stub().resolves(returnValue)();
            api = env.stub().returns(promise);
            return proxyquire('./profile.actions', {
                '../../../common/api': api
            });
        };
    });

    describe('User', () => {
        beforeEach(() => {
            sut = executeSut(user);
            fetcher = sut.getUser(userId);
        });

        it('should fetch user', () => {
            const expectedUrl = `/api/profile/${userId}`;
            fetcher(dispatch);

            api.should.have.been.calledWith(expectedUrl).and.callCount(1);
        });

        it('should dispatch user event with data from response', () => {
            fetcher(dispatch);
            return promise.finally(() => {
                const action = dispatch.lastCall.args[0];
                action.should.eqls({
                    type: sut.GET_USER,
                    user
                });
            });
        });
    });

    describe('Challenges', () => {
        beforeEach(() => {
            sut = executeSut(challengesResponse);
            fetcher = sut.getChallenges(userId);
        });

        it('should fetch Accepted', () => {
            const expectedUrl = `/api/challenge/user/${userId}/status/accepted`;
            fetcher(dispatch);

            api.should.have.been.calledWith(expectedUrl).and.callCount(3);
        });

        it('should fetch Created', () => {
            const expectedUrl = `/api/challenge/user/${userId}/status/created`;
            fetcher(dispatch);

            api.should.have.been.calledWith(expectedUrl).and.callCount(3);
        });

        it('should fetch Completed', () => {
            const expectedUrl = `/api/challenge/user/${userId}/status/completed`;
            fetcher(dispatch);

            api.should.have.been.calledWith(expectedUrl).and.callCount(3);
        });

        it('should dispatch user event with created challenges from response', () => {
            fetcher(dispatch);
            return promise.finally(() => {
                const action = dispatch.secondCall.args[0];
                action.should.eqls({
                    type: sut.CREATED_CHALLENGES_RECEIVED,
                    challenges
                });
            });
        });

        it('should dispatch user event with accepted challenges from response', () => {
            fetcher(dispatch);
            return promise.finally(() => {
                const action = dispatch.firstCall.args[0];
                action.should.eqls({
                    type: sut.ACCEPTED_CHALLENGES_RECEIVED,
                    challenges
                });
            });
        });

        it('should dispatch user event with completed challenges from response', () => {
            fetcher(dispatch);
            return promise.finally(() => {
                const action = dispatch.thirdCall.args[0];
                action.should.eqls({
                    type: sut.COMPLETED_CHALLENGES_RECEIVED,
                    challenges
                });
            });
        });
    });
});
