import proxyquire from 'proxyquire';

describe('CategoryTileListContainer', () => {
    let sut,
        reactRedux,
        wrapWithConnect,
        CategoryTileList,
        categoriesActionCreators,
        dispatch;

    beforeEach(() => {
        dispatch = env.stub();

        wrapWithConnect = env.stub().returns({});

        reactRedux = {
            connect: env.stub().returns(wrapWithConnect)
        };

        CategoryTileList = {
            default: Symbol()
        };

        categoriesActionCreators = {
            getCategories: env.stub().returns({}),
            toggleCategory: env.stub().returns({})
        };

        sut = proxyquire('./CategoryTileListContainer', {
            'react-redux': reactRedux,
            './CategoryTileList': CategoryTileList,
            '../categories.actions': categoriesActionCreators
        });
    });

    it('should map state categories to props challenges', () => {
        const categories = {};
        const state = { categories };
        reactRedux.connect.getCall(0).args[0](state).should.contains({ categories });
    });

    it('should map dispatch to categories fetching prop method', () => {
        const { getCategories } = reactRedux.connect.getCall(0).args[1](dispatch);
        getCategories();
        dispatch.should.calledWith(categoriesActionCreators.getCategories());
    });

    it('should map dispatch to onclick prop method', () => {
        const { onCLick } = reactRedux.connect.getCall(0).args[1](dispatch);
        onCLick();
        dispatch.should.calledWith(categoriesActionCreators.toggleCategory());
    });

    it('should pass category name to action creator in mapped onClick handler', () => {
        const name = Symbol();
        const { onCLick } = reactRedux.connect.getCall(0).args[1](dispatch);
        onCLick(name);
        categoriesActionCreators.toggleCategory.should.calledWith(name);
    });

    it('should map to props once', () => {
        reactRedux.connect.should.callCount(1);
    });

    it('should wrap CategoryTileList component', () => {
        wrapWithConnect.should.calledWith(CategoryTileList.default)
            .and
            .callCount(1);
    });

    it('should return react-redux container', () => {
        sut.default.should.equal(wrapWithConnect());
    });
});
