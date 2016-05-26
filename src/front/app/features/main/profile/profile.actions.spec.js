const proxyquire = require('proxyquire').noCallThru();

describe('action/profile', () => {
    let sut;
    let dispatch;
    let api;
    let fetcher;
    let promise;
    let user;

    beforeEach(() => {
        user = {
            name: 'mockName'
        };

        dispatch = env.spy();

        promise = env.stub().resolves(user)();

        api = env.stub().returns(promise);

        sut = proxyquire('./profile.actions', {
            '../../../common/api': api
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
                user
            });
        });
    });
});
