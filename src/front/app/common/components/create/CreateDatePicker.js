import React, { PropTypes } from 'react';

const CreateDatePicker = ({ label, date, disabled, minDate, maxDate }) => (
    <div className="create-datepicker">
        <label className="create-datepicker__label">
            {label}
        </label>

        <div className="create-datepicker__field-wrapp">
            <input
              type="date"
              className="create-datepicker__field"
              disabled={disabled}
              min={minDate}
              max={maxDate}
              {...date}
            />
        </div>
    </div>
);


CreateDatePicker.propTypes = {
    label: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    date: PropTypes.object,
    minDate: PropTypes.string,
    maxDate: PropTypes.string
};


export default CreateDatePicker;
