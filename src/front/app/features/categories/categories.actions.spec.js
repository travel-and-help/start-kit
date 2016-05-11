import { getCategories, GET_CATEGORIES } from './categories.actions';

describe('action/categories', () => {
    let dispatch;

    describe('#getCategories', () => {
        let fetcher;
        let promise;
        let fetchResponse;
        let categoryList;

        beforeEach(() => {
            categoryList = ['mockedCategories'];

            dispatch = env.spy();

            fetchResponse = {
                json: env.stub().returns(categoryList)
            };

            promise = env.stub().resolves(fetchResponse)();

            global.fetch = env.stub().returns(promise);

            fetcher = getCategories();
        });

        it('should fetch categories', () => {
            fetcher(dispatch);

            global.fetch.should.have.been.calledWith('/api/categories').and.callCount(1);
        });

        it('should dispatch categories event with data from response', () => {
            fetcher(dispatch);
            return promise.finally(() => {
                const action = dispatch.lastCall.args[0];
                action.should.eqls({
                    type: GET_CATEGORIES,
                    categories: categoryList
                });
            });
        });
    });
});
