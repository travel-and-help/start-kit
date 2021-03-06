import proxyquire from 'proxyquire';
import { fromJS } from 'immutable';

describe('action/create', () => {
    let sut,
        router,
        api,
        promise,
        dispatch;

    beforeEach(() => {
        router = {
            goBack: env.spy(),
            push: env.spy()
        };

        dispatch = env.spy();
    });

    const executeSut = (resolveValue) => {
        promise = env.stub().resolves(resolveValue)();

        api = env.stub().returns(promise);

        const apiWrapper = {
            default: api
        };

        return proxyquire('./create.actions', {
            '../../common/api': apiWrapper,
            'react-router-redux': router
        });
    };

    describe('#fetchCategories', () => {
        const categoryList = ['mockedCategories'];
        beforeEach(() => {
            sut = executeSut(categoryList);
            sut.fetchCategories()(dispatch);
        });

        it('should fetch categories', () => {
            api.should.have.been.calledWith('/api/categories').and.callCount(1);
        });

        it('should dispatch categories event with data from response', () => {
            promise.finally(() => {
                const action = dispatch.lastCall.args[0];
                action.should.eqls({
                    type: sut.GET_CATEGORIES,
                    categories: categoryList
                });
            });
        });
    });

    describe('#postChallenge', () => {
        const challengeMock = {
            name: 'mockChallenge'
        };
        beforeEach(() => {
            sut = executeSut(challengeMock);
            const innerPostChallenge = sut.sendChallenge()(challengeMock);
            innerPostChallenge(dispatch);
        });

        it('should post challenge', () => {
            const options = {
                method: 'POST',
                body: JSON.stringify(challengeMock)
            };

            api.should.have.been.calledWith('/api/challenges', options).and.callCount(1);
        });

        it('should dispatch challenge event with data from response', () => {
            promise.finally(() => {
                const action = dispatch.firstCall.args[0];
                action.should.eqls({
                    type: sut.POST_CHALLENGE,
                    challenge: challengeMock
                });
            });
        });
    });

    describe('#updateChallenge', () => {
        const _id = '_id';
        const challenge = {
            name: 'mockChallenge',
            _id
        };
        const editedChallenge = {
            name: 'name'
        };
        beforeEach(() => {
            const immutableChallenge = fromJS(challenge);
            sut = executeSut(challenge);
            const innerSendChallenge = sut.sendChallenge(immutableChallenge);
            const innerUpdateChallenge = innerSendChallenge(editedChallenge);
            innerUpdateChallenge(dispatch);
        });

        it('should update challenge', () => {
            const options = {
                method: 'PUT',
                body: JSON.stringify(editedChallenge)
            };

            api.should.have.been.calledWith(`/api/challenges/${_id}`, options).and.callCount(1);
        });

        it('should dispatch challenge event with data from response', () => {
            promise.finally(() => {
                const action = dispatch.firstCall.args[0];
                action.should.eqls({
                    type: sut.POST_CHALLENGE,
                    challenge: editedChallenge
                });
            });
        });
    });
});
