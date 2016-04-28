import proxyquire from 'proxyquire';

describe('store', () => {

    let redux,
        reactRouter,
        reactRouterRedux,
        challenges,
        categories,
        thunk,
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

        thunk = {
            default: 'thunk'
        };

        challenges = {
            default: env.stub()
        };

        categories = {
            default: env.stub()
        };

        const sut = proxyquire('./store', {
            redux,
            'react-router': reactRouter,
            'react-router-redux': reactRouterRedux,
            'redux-thunk': thunk,
            './reducers/challenges': challenges,
            './reducers/categories': categories
        }).default;

        result = sut();
    });

    it('should combine challenges and routing reducers once', () => {
        redux.combineReducers.should
            .calledWith({
                challenges: challenges.default,
                routing: reactRouterRedux.routerReducer,
                categories: categories.default
            })
            .and
            .callCount(1);
    });

    it('should apply thunk middleware once', () => {
        redux.applyMiddleware.should
        .calledWith(thunk.default)
        .and
        .callCount(1);
    });

    it('should create store for combined reducer and apply middleware', () => {
        redux.createStore.should
            .calledWith(
                redux.combineReducers(),
                redux.applyMiddleware()
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
