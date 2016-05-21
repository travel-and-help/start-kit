import React from 'react';
import { mount } from 'enzyme';
import Login from './login-screen';

describe('login-screen-container.integration', () => {
    let facebookLogin,
        googleLogin,
        wrapper;

    beforeEach(() => {
        facebookLogin = env.stub();
        googleLogin = env.stub();

        wrapper = mount(<Login
          facebookLogin={facebookLogin}
          googleLogin={googleLogin}
        />);
    });

    it('should render login buttons', () => {
        wrapper.find('.login-button').at(0).text().should.equal('Facebook');
        wrapper.find('.login-button').at(1).text().should.equal('G+');
    });

    it('should trigger facebookLogin method on facebook login click', () => {
        const button = wrapper.find('.login-button').at(0);
        button.simulate('click');
        facebookLogin.should.calledWith();
    });

    it('should trigger googleLogin method on google login click', () => {
        const button = wrapper.find('.login-button').at(1);
        button.simulate('click');
        googleLogin.should.calledWith();
    });
});