import proxyquire from 'proxyquire';

describe('storeEnhancers', () => {
    let redux,
        thunk,
        sut;

    function importSut() {
        return proxyquire('./enhancers', {
            redux,
            'redux-thunk': thunk
        }).default;
    }

    beforeEach(() => {
        redux = {
            applyMiddleware: env.stub().returns({}),
            compose: env.stub().returns({})
        };

        thunk = {
            default: 'thunk'
        };
    });

    describe('regardless of environment', () => {
        beforeEach(() => {
            sut = importSut();
        });

        it('should apply thunk middleware once', () => {
            redux.applyMiddleware.should
                .calledWith(thunk.default)
                .and
                .callCount(1);
        });

        it('should return composed enhancers', () => {
            sut.should.equal(redux.compose());
        });
    });

    describe('in development environment', () => {
        beforeEach(() => {
            process.env.NODE_ENV = 'development';
        });

        it('should apply devToolsExtension if available', () => {
            global.devToolsExtension = env.stub().returns({});
            importSut();
            redux.compose.should.calledWith(redux.applyMiddleware(), global.devToolsExtension())
                .and
                .callCount(1);
        });

        it('should compose dummy function if devToolsExtension is not available', () => {
            importSut();
            redux.compose.getCall(0).args[1](42).should.equal(42);
        });

        afterEach(() => {
            delete global.devToolsExtension;
            delete process.env.NODE_ENV;
        });
    });

    describe('in production environment', () => {
        beforeEach(() => {
            global.devToolsExtension = env.stub().returns({});
            process.env.NODE_ENV = 'production';
            importSut();
        });

        it('should NOT apply devToolsExtension', () => {
            global.devToolsExtension.should.callCount(0);
        });

        afterEach(() => {
            delete global.devToolsExtension;
            delete process.env.NODE_ENV;
        });
    });
});
