const proxyquire = require('proxyquire').noCallThru();

describe('action/profile', () => {
    let sut;
    let dispatch;
    let api;
    let profile;

    beforeEach(() => {
        profile = {
            name: 'mockName'
        };

        dispatch = env.stub();

        api = env.stub().resolves(profile);

        sut = proxyquire('./profile.actions', {
            '../../../common/api': api
        });
    });

    describe('load', () => {
        let result;

        beforeEach(() => {
            result = sut.load()(dispatch);
        });

        it('should fetch user', () => {
            api.should.calledWith('/api/profile/my');
        });

        it('should dispatch user event with data from response', () =>
            result.finally(() =>
                dispatch.should.been.calledWith({
                    type: 'PROFILE_RECEIVED',
                    profile
                })
            )
        );
    });
});
