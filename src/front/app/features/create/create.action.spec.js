const proxyquire = require('proxyquire').noCallThru();

describe('action/create', () => {
    let sut;
    let dispatch;
    let api;
    let promise;

    beforeEach(() => {

    });

    describe('#fetchCategories', () => {
        let fetcher;
        const categoryList = ['mockedCategories'];

        beforeEach(() => {
            promise = env.stub().resolves(categoryList)();

            api = env.stub().returns(promise);

            sut = proxyquire('./create.actions', {
                '../../common/api': api
            });

            dispatch = env.spy();

            fetcher = sut.fetchCategories();
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


    describe('#postChallenge', () => {
        let rut;
        let challengeMock;

        beforeEach(() => {
            challengeMock = {
                name: 'mockChallenge'
            };

            promise = env.stub().resolves(challengeMock)();

            api = env.stub().returns(promise);

            sut = proxyquire('./create.actions', {
                '../../common/api': api
            });

            dispatch = env.spy();

            rut = sut.postChallenge(challengeMock);
        });

        it('should post challenge', () => {
            const options = {
                method: 'POST',
                body: JSON.stringify(challengeMock)
            };

            rut();

            api.should.have.been.calledWith('/api/challenges/', options).and.callCount(1);
        });

        it('should dispatch challenge event with data from response', () => {
            rut(dispatch);

            return promise.finally(() => {
                const action = dispatch.lastCall.args[0];
                action.should.eqls({
                    type: sut.POST_CHALLENGE,
                    challenge: challengeMock
                });
            });
        });
    });
});
