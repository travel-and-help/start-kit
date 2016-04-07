import proxyquire from 'proxyquire';

describe('store', () => {

    let redux,
        reactRouter,
        reactRouterRedux,
        appReducer,
        result;

    beforeEach(() => {

        redux = {
            createStore: env.stub().returns({}),
            combineReducers: env.stub().returns({})
        };

        reactRouter = {
            browserHistory: {}
        };

        reactRouterRedux = {
            syncHistoryWithStore: env.stub().returns({}),
            routerReducer: env.stub()
        };

        appReducer = {
            default: env.stub()
        };

        const sut = proxyquire('./store', {
            redux,
            'react-router': reactRouter,
            'react-router-redux': reactRouterRedux,
            './reducer/app': appReducer
        }).default;

        result = sut();
    });

    it('should combine app and routing reducers', () => {
        redux.combineReducers.should
            .calledWith({
                app: appReducer.default,
                routing: reactRouterRedux.routerReducer
            })
            .and
            .callCount(1);
    });

    it('should create store for combined reducer', () => {
        redux.createStore.should
            .calledWith(redux.combineReducers())
            .and
            .callCount(1);
    });

    it('should sync history with app store', () => {
        reactRouterRedux.syncHistoryWithStore.should
            .calledWith(reactRouter.browserHistory, redux.createStore())
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
