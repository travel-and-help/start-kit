import { getCategories, GET_CATEGORIES } from './categories';

describe('action/categories', () => {
    let sut;
    let dispatch;
    let fakeServerResponse;
    let mockedFetchResponse;
    let mockedCategories;

    describe('getCategories', () => {
        beforeEach(() => {
            mockedCategories = ['mockedCategories'];

            dispatch = env.spy();

            fakeServerResponse = {
                json: env.spy()
            };

            mockedFetchResponse = {
                then(fakeCallback) {
                    fakeCallback(fakeServerResponse);
                    return {
                        then(cb) {
                            cb(mockedCategories);
                        }
                    };
                }
            };

            global.fetch = env.spy(() => mockedFetchResponse);

            sut = getCategories();

        });

        it('fetch categories', () => {
            sut(dispatch);

            global.fetch.should.have.been.calledWith('/api/categories').and.callCount(1);
        });

        it('should convert response to JSON', () => {
            sut(dispatch);

            fakeServerResponse.json.should.have.been.calledWith();
        });

        it('should dispatch categories event with data', () => {
            sut(dispatch);

            const dispatchArgs = dispatch.lastCall.args[0];
            dispatchArgs.should.eqls({
                type: GET_CATEGORIES,
                categories: mockedCategories
            });
        });
    });
});
