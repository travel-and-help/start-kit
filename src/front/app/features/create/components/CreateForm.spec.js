import React from 'react';
import { List, fromJS } from 'immutable';
import proxyquire from 'proxyquire';
import { mount } from 'enzyme';

xdescribe('CreateForm', () => {
    let CreateForm,
        push,
        categories,
        getCategories,
        mockStore;

    beforeEach(() => {
        const challenge = fromJS({
            categories: []
        });
        const auth = fromJS({
            userId: 'userId'
        });
        mockStore = {
            subscribe: env.spy(),
            getState: env.stub().returns({
                form: {},
                challenge,
                auth
            }),
            dispatch: env.spy()
        };
        push = env.spy();
        getCategories = env.spy();
        categories = new List();

        const reactRouter = {
            hashHistory: {
                push
            }
        };

        const params = {
            challengeId: 'challengeId'
        };

        const reduxForm = env.spy(() => (component) => component);
        CreateForm = proxyquire('./CreateForm', {
            'react-router': reactRouter,
            'redux-form': reduxForm
        }).default;

        mount(<CreateForm
            store={mockStore}
            categories={categories}
            getCategories={getCategories}
            params={params}
        />);
    });

    it('should redirect to login if user is NOT logged in', () => {
        push.should.been.calledWith('/');
    });

    it('should get categories if they NOT present in state', () => {
        getCategories.should.been.called.and.callCount(1);
    });
});
