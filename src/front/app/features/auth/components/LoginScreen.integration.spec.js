import React from 'react';
import { shallow } from 'enzyme';
import Login from './LoginScreen';

describe('auth LoginScreenContainer', () => {
    let facebookLogin,
        googleLogin,
        skipLogin,
        wrapper;

    beforeEach(() => {
        facebookLogin = env.stub();
        googleLogin = env.stub();
        skipLogin = env.stub();

        wrapper = shallow(<Login
          facebookLogin={facebookLogin}
          googleLogin={googleLogin}
          skipLogin={skipLogin}
        />)
        ;
    });

    it('should render login buttons', () => {
        wrapper.find('LoginButton').at(0).props().text.should.equal('Facebook');
        wrapper.find('LoginButton').at(1).props().text.should.equal('G+');
    });

    it('should trigger facebookLogin method on facebook login click', () => {
        const button = wrapper.find('LoginButton').at(0);
        button.simulate('click');
        facebookLogin.should.calledWith();
    });

    it('should trigger googleLogin method on google login click', () => {
        const button = wrapper.find('LoginButton').at(1);
        button.simulate('click');
        googleLogin.should.calledWith();
    });

    it('should trigger skipLogin method on skip click', () => {
        const button = wrapper.find('.login-screen__skip').at(0);
        button.simulate('click');
        skipLogin.should.calledWith();
    });

});
