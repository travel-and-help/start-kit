const proxyquire = require('proxyquire').noCallThru();

describe('action/profile', () => {
    let sut, dispatch, api, fetcher, promise, fetchResponse, user;

    beforeEach(() => {
        user = {
          name: 'mockName'
        };

        dispatch = env.spy();

        fetchResponse = {
            json: env.stub().returns(user)
        };

        promise = env.stub().resolves(fetchResponse)();

        api = env.stub().returns(promise);

        sut = proxyquire('./profile.actions', {
            '../../common/api': api
        });

        fetcher = sut.getUser();
    });

    it('should fetch user', () => {
        fetcher(dispatch);

        api.should.have.been.calledWith('/api/myprofile').and.callCount(1);
    });

    it('should dispatch user event with data from response', () => {
            fetcher(dispatch);
            return promise.finally(() => {
                const action = dispatch.lastCall.args[0];
                action.should.eqls({
                    type: sut.GET_USER,
                    user: user
                });
            });
        });
});
