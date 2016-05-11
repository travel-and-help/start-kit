const proxyquire = require('proxyquire').noCallThru();

describe('action/categories', () => {
    let sut;
    let dispatch;
    let api;
    let promise;
    const categoryList = ['mockedCategories'];

    beforeEach(() => {

        const fetchResponse = {
            json: env.stub().returns(categoryList)
        };

        promise = env.stub().resolves(fetchResponse)();

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
});
