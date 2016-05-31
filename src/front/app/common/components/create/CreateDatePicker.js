import React, { PropTypes } from 'react';

const CreateDatePicker = ({ label, value, checked, disabled }) => (
    <div className="create-datepicker">
        <label className="create-datepicker__label">
            {label}
        </label>

        <div className="create-datepicker__field-wrapp">
            <div className="create-datepicker__btn">
                <input type="checkbox"
                  className="create-datepicker__input"
                  disabled={disabled}
                  defaultChecked={checked}
                />

                <div className="create-datepicker__bg"></div>
            </div>

            <input
              type="date"
              className="create-datepicker__value"
              {...value}
            />

            <button
              className="create-datepicker__change-btn"
              type="button"
            >
                Change
            </button>
        </div>
    </div>
);

CreateDatePicker.propTypes = {
    label: PropTypes.string.isRequired,
    checked: PropTypes.bool,
    disabled: PropTypes.bool,
    value: PropTypes.object
};


export default CreateDatePicker;
