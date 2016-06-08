import React from 'react';
import CreateError from './CreateError';
import { mount } from 'enzyme';

describe('CreateError', () => {
    let sut;
    let formFieldsMock;

    beforeEach(() => {
        formFieldsMock = {
            title: {
                error: 'Some error',
                touched: true
            }
        };

        sut = mount(<CreateError formFields={formFieldsMock} />);
    });

    it('should show error message', () => {
        sut.find('.create-error__message')
            .text().should.equal('Fill all necessary fields');
    });

    it('should be visible', () => {
        sut.find('.create-error')
            .hasClass('.create-error_hide').should.equal(false);
    });
});
