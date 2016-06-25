import React from 'react';
import { mount } from 'enzyme';
import loadable from './loadable';

describe('common/loadable', () => {
    const MyComponent = () => (<div>MyComponent</div>);

    let sut,
        props;

    beforeEach(() => {
        props = {
            myComponentProps: env.stub(),
            onLoad: env.stub()
        };
        const MyLoadableComponent = loadable(MyComponent);

        sut = mount(<MyLoadableComponent {...props} />);
    });

    it('should invoke on load on creation', () => {
        props.onLoad.should.callCount(1);
    });

    it('should render MyComponent with self props', () => {
        sut.should.contain(<MyComponent {...props} />);
    });

});
