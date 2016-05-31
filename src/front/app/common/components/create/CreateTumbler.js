import React, { PropTypes } from 'react';

const CreateTumbler = ({ label, value, checked, disabled }) => (
    <div className="create-tumbler">
        <label className="create-tumbler__label">
            {label}
        </label>

        <div className="create-tumbler__btn">
            <input type="checkbox"
              className="create-tumbler__input"
              disabled={disabled}
              checked={checked}
              {...value}
            />

            <div className="create-tumbler__bg"></div>
        </div>
    </div>
);

CreateTumbler.propTypes = {
    label: PropTypes.string.isRequired,
    checked: PropTypes.bool,
    disabled: PropTypes.bool,
    value: PropTypes.object
};

export default CreateTumbler;
