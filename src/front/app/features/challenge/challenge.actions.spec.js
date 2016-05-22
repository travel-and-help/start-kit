const proxyquire = require('proxyquire').noCallThru();

describe('action/challenge', () => {
    let sut;
    let dispatch;
    let api;

    let promise;
    let fetchResponse;
    let challenge;

    beforeEach(() => {
        challenge = [];

        dispatch = env.stub();

        fetchResponse = {
            json: env.stub().returns(challenge)
        };

        promise = env.stub().resolves(fetchResponse)();

        api = env.stub().returns(promise);

        sut = proxyquire('./challenge.actions', {
            '../../common/api': api
        });
    });

    describe('#fetchChallenge', () => {
        let fetcher;
        let id;

        beforeEach(() => {
            fetcher = sut.fetchChallenge();
        });

        it('should fetch challenge', () => {
            fetcher(dispatch);
            api.should.have.been.calledWith('/api/challenge/' + id).and.callCount(1);
        });

        it('should dispatch GET_CHALLENGE event with data from response', () => {
            fetcher(dispatch);
            return promise.finally(() => {
                const action = dispatch.lastCall.args[0];
                action.should.eqls({
                    type: sut.GET_CHALLENGE,
                    challenge: challenge
                });
            });
        });
    });
});
