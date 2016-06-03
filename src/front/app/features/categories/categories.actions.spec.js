const proxyquire = require('proxyquire').noCallThru();

describe('action/categories', () => {
    let sut;
    let dispatch;
    let api;
    let promise;
    const categoryList = ['mockedCategories'];

    beforeEach(() => {

        promise = env.stub().resolves(categoryList)();

        api = env.stub().returns(promise);

        sut = proxyquire('./categories.actions', {
            '../../common/api': api
        });

    });

    describe('#getCategories', () => {
        let fetcher;

        beforeEach(() => {

            dispatch = env.spy();

            fetcher = sut.getCategories();
        });

        it('should fetch categories', () => {
            fetcher(dispatch);
            api.should.have.been.calledWith('/api/categories').and.callCount(1);
        });

        it('should dispatch categories event with data from response', () => {
            fetcher(dispatch);
            return promise.finally(() => {
                const action = dispatch.lastCall.args[0];
                action.should.eqls({
                    type: sut.GET_CATEGORIES,
                    categories: categoryList
                });
            });
        });
    });

    describe('#watchCategory', () => {
        it('should return watch category action', () => {
            const categoryId = 123;
            const response = sut.watchCategory(categoryId);

            response.should.eqls({
                type: sut.WATCH_CATEGORY,
                categoryId
            });
        });
    });

    describe('#saveCategories', () => {
        let ret;
        let categories;

        beforeEach(() => {
            categories = 'smth';

            ret = sut.saveCategories(categories);
        });

        it('should save provided categories', () => {
            const options = {
                method: 'POST',
                body: JSON.stringify(categories)
            };

            ret();

            api.should.have.been.calledWith('/api/categories', options).and.callCount(1);
        });
    });
});
