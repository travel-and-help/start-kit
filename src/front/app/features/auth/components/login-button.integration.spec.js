import React from 'react';
import { mount } from 'enzyme';
import LoginButton from './login-button';

describe.only('LoginButton', () => {

    let text,
        onClick,
        wrapper;

    beforeEach(() => {
        onClick = env.stub();
        text = 'test Button Text';
        wrapper = mount(<LoginButton text={text} onLogin={ onClick } />);
    });

    it('should render with text', () => {
        wrapper.find('.login-button').text().should.equal(text);
    });

    it('should trigger onClick method on category tile click', () => {
        const categoryTile = wrapper.find('.login-button').at(0);
        categoryTile.simulate('click');
        onClick.should.callCount(1);
    });

});
