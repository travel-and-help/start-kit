import React from 'react';
import CreateDatePicker from './CreateDatePicker';
import { mount } from 'enzyme';

describe('CreateDatePicker', () => {
    let sut;

    const mock = {
        label: 'test',
        minDate: 'min',
        maxDate: 'max',
        disabled: true,
        date: {}
    };

    beforeEach(() => {
        sut = mount(
            <CreateDatePicker label={mock.label} date={mock.date} disabled={mock.disabled} minDate={mock.minDate} maxDate={mock.maxDate} />
        );
    });

    it('should contains label', () => {
        sut.find('.create-datepicker__label')
            .text().should.equal(mock.label);
    });

    it('should contains disabled input', () => {
        sut.find('.create-datepicker__field')
            .prop('disabled').should.equal(true);
    });

    it('should contains date input with min attribute', () => {
        sut.find('.create-datepicker__field')
            .prop('min').should.equal(mock.minDate);
    });

    it('should contains date input with max attribute', () => {
        sut.find('.create-datepicker__field')
            .prop('max').should.equal(mock.maxDate);
    });
});
