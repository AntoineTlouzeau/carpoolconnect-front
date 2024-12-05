// RadioButton.js
import React from 'react';

const RadioButton = ({ label, value, checked, onChange }) => {
  return (
    <label className="inline-flex items-center mr-4">
      <input
        type="radio"
        value={value}
        checked={checked}
        onChange={onChange}
        className="form-radio text-indigo-600"
      />
      <span className="ml-2">{label}</span>
    </label>
  );
};

export default RadioButton;
