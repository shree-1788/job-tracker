/* eslint-disable no-unused-vars */
import React from "react";

// eslint-disable-next-line react/prop-types
const FormRow = ({ type, name, labelText, defaultValue = "", onChange }) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <input
        type={type}
        name={name}
        className="form-input"
        defaultValue={defaultValue}
        required
        onChange={onChange}
      />
    </div>
  );
};

export default FormRow;
