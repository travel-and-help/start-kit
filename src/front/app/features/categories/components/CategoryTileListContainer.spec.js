import proxyquire from 'proxyquire';
import { List, fromJS } from 'immutable';

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
            watchCategory: env.stub().returns({}),
            saveCategories: env.stub().returns({})
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
        const { onCategoryClick } = reactRedux.connect.getCall(0).args[1](dispatch);
        onCategoryClick();
        dispatch.should.calledWith(categoriesActionCreators.watchCategory());
    });

    it('should pass category name to action creator in mapped onCategoryClick handler', () => {
        const name = Symbol();
        const { onCategoryClick } = reactRedux.connect.getCall(0).args[1](dispatch);
        onCategoryClick(name);
        categoriesActionCreators.watchCategory.should.calledWith(name);
    });

    it('should map dispatch to onSaveCategoryClick prop method', () => {
        const { onSaveCategoryClick } = reactRedux.connect.getCall(0).args[1](dispatch);
        const category = fromJS({
            checked: false,
            _id: 1
        });
        const categories = List.of(category);

        onSaveCategoryClick(categories);
        dispatch.should.calledWith(categoriesActionCreators.saveCategories());
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
