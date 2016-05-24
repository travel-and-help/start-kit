import proxyquire from 'proxyquire';

describe('store', () => {

    let redux,
        reactRouter,
        reactRouterRedux,
        challenges,
        categories,
        challenge,
        auth,
        storeEnhancers,
        result;

    beforeEach(() => {

        redux = {
            createStore: env.stub().returns({}),
            combineReducers: env.stub().returns({}),
            applyMiddleware: env.stub().returns({})
        };

        reactRouter = {
            hashHistory: {}
        };

        reactRouterRedux = {
            syncHistoryWithStore: env.stub().returns({}),
            routerReducer: env.stub()
        };

        challenges = {
            default: env.stub()
        };

        storeEnhancers = {
            default: env.stub()
        };

        categories = {
            default: env.stub()
        };

        challenge = {
            default: env.stub()
        };

        auth = {
            default: env.stub()
        };

        const sut = proxyquire('./index', {
            redux,
            'react-router': reactRouter,
            'react-router-redux': reactRouterRedux,
            '../features/main/challenges/challenges.reducer': challenges,
            '../features/challenge/challenge.reducer': challenge,
            '../features/categories/categories.reducer': categories,
            '../features/auth/auth.reducer': auth,
            './enhancers': storeEnhancers
        }).default;

        result = sut();
    });

    it('should combine challenges and routing reducers once', () => {
        redux.combineReducers.should
            .calledWith({
                auth: auth.default,
                challenges: challenges.default,
                challenge: challenge.default,
                routing: reactRouterRedux.routerReducer,
                categories: categories.default
            })
            .and
            .callCount(1);
    });

    it('should create store for combined reducer with respective enhancers', () => {
        redux.createStore.should
            .calledWith(
                redux.combineReducers(),
                storeEnhancers.default
            )
            .and
            .callCount(1);
    });

    it('should sync history with app store', () => {
        reactRouterRedux.syncHistoryWithStore.should
            .calledWith(reactRouter.hashHistory, redux.createStore())
            .and
            .callCount(1);
    });

    it('should return created app store', () => {
        result.state.should.equal(redux.createStore());
    });

    it('should return synced app history', () => {
        result.history.should.equal(reactRouterRedux.syncHistoryWithStore());
    });

});
