import React from 'react';
import proxyquire from 'proxyquire';
import { mount } from 'enzyme';

describe('CreateForm', () => {
    let sut,
        handleSubmit,
        sendChallenge;

    beforeEach(() => {
        sendChallenge = env.spy();

        handleSubmit = env.spy();

        const mockComponent = {
            default: 'mockComponent'
        };

        const CreateForm = proxyquire('./CreateForm', {
            '../../../common/components/create/FormHeader': mockComponent,
            './CreateFormBody': mockComponent
        }).default;

        sut = mount(<CreateForm
            handleSubmit={handleSubmit}
            sendChallenge={sendChallenge}
        />);
    });

    it('should call action from props on submit', () => {
        sut.simulate('submit');
        handleSubmit.should.been.calledWith(sendChallenge);
    });
});
