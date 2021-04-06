import React from 'react';

export default function TextField({
  label,
  type,
  name,
  onChange,
  formType,
}) {
  return (
    <p>
      <label htmlFor={`input-${name}`}>{label}</label>
      {formType === 'textarea' ? (
        <textarea
          type={type}
          name={name}
          id={`input-${name}`}
          onChange={onChange}
        />
      ) : (
        <input
          type={type}
          name={name}
          id={`input-${name}`}
          onChange={onChange}
        />
      )}
    </p>
  );
}
