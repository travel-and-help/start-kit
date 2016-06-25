const proxyquire = require('proxyquire').noCallThru();

describe('app/store', () => {
    let redux,
        history,
        reactRouterRedux,
        challenges,
        categories,
        challenge,
        profile,
        auth,
        form,
        storeEnhancers,
        result,
        profileChallengesStore;

    beforeEach(() => {

        redux = {
            createStore: env.stub().returns({}),
            combineReducers: env.stub().returns({}),
            applyMiddleware: env.stub().returns({})
        };

        history = env.stub();

        reactRouterRedux = {
            syncHistoryWithStore: env.stub().returns({}),
            routerReducer: env.stub()
        };

        challenges = env.stub();

        storeEnhancers = env.stub();

        categories = env.stub();

        challenge = env.stub();

        auth = env.stub();

        form = {
            reducer: env.stub()
        };

        profileChallengesStore = {
            a: 'a',
            b: 'b'
        };

        profile = env.stub();

        const sut = proxyquire('./index', {
            redux,
            './history': history,
            'react-router-redux': reactRouterRedux,
            'redux-form': form,
            '../features/main/challenges/challenges.reducer': challenges,
            '../features/challenge/challenge.reducer': challenge,
            '../features/categories/categories.reducer': categories,
            '../features/auth/auth.reducer': auth,
            '../features/main/profile/profile.reducer': profile,
            './enhancers': storeEnhancers,
            '../features/profile-challenges/profileChallenges.store': profileChallengesStore
        }).default;

        result = sut();
    });

    it('should combine challenges and routing reducers once', () => {
        redux.combineReducers.should
            .calledWith({
                profile,
                auth,
                challenges,
                challenge,
                routing: reactRouterRedux.routerReducer,
                categories,
                ...profileChallengesStore,
                form: form.reducer
            });
    });

    it('should create store for combined reducer with respective enhancers', () => {
        redux.createStore.should
            .calledWith(
                redux.combineReducers(),
                storeEnhancers
            );
    });

    it('should sync history with app store', () => {
        reactRouterRedux.syncHistoryWithStore.should
            .calledWith(history, redux.createStore());
    });

    it('should return created app store', () => {
        result.state.should.equal(redux.createStore());
    });

    it('should return synced app history', () => {
        result.history.should.equal(reactRouterRedux.syncHistoryWithStore());
    });

});
