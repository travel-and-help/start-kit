import React from 'react';
import CreateTumbler from './CreateTumbler';
import { mount } from 'enzyme';

describe('CreateTumbler', () => {
    let sut;

    const mock = {
        label: 'test',
        checked: true,
        disabled: true,
        value: {}
    };

    beforeEach(() => {
        sut = mount(
            <CreateTumbler
              label={mock.label}
              checked={mock.checked}
              value={mock.value}
              disabled={mock.disabled}
            />
        );
    });

    it('should contains label', () => {
        sut.find('.create-tumbler__label')
            .text().should.equal(mock.label);
    });

    it('should contains checked input', () => {
        sut.find('.create-tumbler__input')
            .prop('defaultChecked').should.equal(true);
    });

    it('should contains disabled input', () => {
        sut.find('.create-tumbler__input')
            .prop('disabled').should.equal(true);
    });
});
