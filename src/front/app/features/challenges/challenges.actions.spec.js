const proxyquire = require('proxyquire').noCallThru();

describe('action/challenges', () => {
    let sut;
    let dispatch;
    let api;

    let promise;
    let fetchResponse;
    let challengesList;

    beforeEach(() => {
        challengesList = [];

        dispatch = env.stub();

        fetchResponse = {
            json: env.stub().returns(challengesList)
        };

        promise = env.stub().resolves(fetchResponse)();

        api = env.stub().returns(promise);

        sut = proxyquire('./challenges.actions', {
            '../../common/api': api
        });
    });

    describe('#fetchChallenges', () => {
        let fetcher;

        beforeEach(() => {
            fetcher = sut.fetchChallenges();
        });

        it('should fetch challenges', () => {
            fetcher(dispatch);
            api.should.have.been.calledWith('/api/challenges').and.callCount(1);
        });

        it('should dispatch GET_CHALLENGES event with data from response', () => {
            fetcher(dispatch);
            return promise.finally(() => {
                const action = dispatch.lastCall.args[0];
                action.should.eqls({
                    type: sut.GET_CHALLENGES,
                    challenges: challengesList
                });
            });
        });
    });
});
