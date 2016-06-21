import React from 'react';
import { List } from 'immutable';
import proxyquire from 'proxyquire';
import { mount } from 'enzyme';

describe('CreateForm', () => {
    let CreateForm,
        push,
        categories,
        getCategories,
        mockStore;

    beforeEach(() => {
        mockStore = {
            subscribe: env.spy(),
            getState: env.stub().returns({ form: {} }),
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
        const reduxForm = env.spy(() => (component) => component);
        CreateForm = proxyquire('./CreateForm', {
            'react-router': reactRouter,
            'redux-form': reduxForm
        }).default;
    });

    it('should redirect to login if user is NOT logged in', () => {
        mount(<CreateForm
            store={mockStore}
            categories={categories}
            getCategories={getCategories}
        />);
        push.should.been.calledWith('/');
    });

    it('should get categories if they NOT present in state', () => {
        mount(<CreateForm
            store={mockStore}
            categories={categories}
            getCategories={getCategories}
        />);
        getCategories.should.been.called.and.callCount(1);
    });
});
