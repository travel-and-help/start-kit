import proxyquire from 'proxyquire';

describe('app/main', () => {
    let sut,
        appStore,
        render;

    beforeEach(() => {

        const store = {
            state: {},
            history: {}
        };

        render = env.stub();

        appStore = env.stub().returns(store);

        sut = proxyquire('./main', {
            './store/store': {
                default: appStore
            },
            'react-dom': {
                render
            }
        }).default;

        global.document = {
            getElementById: env.stub()
        };

    });

    it('should create app store', () => {
        sut();
        appStore.should.been.calledWith();
    });

    it('should render app on root', () => {
        const rootElement = 'theRootElement';
        global.document.getElementById.withArgs('root').returns(rootElement);
        sut();
        render.should.been.calledWith(sinon.match.object, rootElement);

    });
});
