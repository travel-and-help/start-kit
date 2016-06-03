import { getUser, GET_USER } from './profile.actions';

describe('action/profile', () => {
    let dispatch;

    describe('#getUser', () => {
        let fetcher;
        let promise;
        let fetchResponse;
        let user;

        beforeEach(() => {
            user = {
              name: 'mockName'
            };

            dispatch = env.spy();

            fetchResponse = {
                json: env.stub().returns(user)
            };

            promise = env.stub().resolves(fetchResponse)();

            global.fetch = env.stub().returns(promise);

            fetcher = getUser();
        });

        it('should fetch user', () => {
            fetcher(dispatch);

            global.fetch.should.have.been.calledWith('/api/user').and.callCount(1);
        });

        it('should dispatch user event with data from response', () => {
            fetcher(dispatch);
            return promise.finally(() => {
                const action = dispatch.lastCall.args[0];
                action.should.eqls({
                    type: GET_USER,
                    user: user
                });
            });
        });
    });
});
