import { fetchChallenges, GET_CHALLENGES } from './challenges.actions';

describe('action/challenges', () => {
    let dispatch;

    describe('#fetchChallenges', () => {
        let fetcher;
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

            global.fetch = env.stub().returns(promise);

            fetcher = fetchChallenges();
        });

        it('should fetch challenges', () => {
            fetcher(dispatch);
            global.fetch.should.have.been.calledWith('/api/challenges').and.callCount(1);
        });

        it('should dispatch GET_CHALLENGES event with data from response', () => {
            fetcher(dispatch);
            return promise.finally(() => {
                const action = dispatch.lastCall.args[0];
                action.should.eqls({
                    type: GET_CHALLENGES,
                    challenges: challengesList
                });
            });
        });
    });
});
