import React from "react";

function CustomInput({
  label,
  id,
  name,
  type,
  value,
  onChange,
  onBlur,
  error,
  touch,
}) {
  return (
    <div className="mb-4">
      <label
        htmlFor={id}
        className="block text-gray-700 text-sm font-medium mb-2"
      >
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
      />
      <p>{error && touch[name] && error}</p>
    </div>
  );
}

export default CustomInput;
