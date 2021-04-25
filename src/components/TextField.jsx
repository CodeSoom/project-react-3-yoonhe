import React from 'react';

export default function TextField({
  label,
  type,
  name,
  selectOptions,
  unit,
  onChange,
}) {
  const INPUT_TYPES = ['text', 'number'];
  const isDefaultInput = INPUT_TYPES.includes(type);

  return (
    <p>
      <label htmlFor={`input-${name}`}>{label}</label>
      {isDefaultInput && (
        <>
          <input
            type={type}
            name={name}
            id={`input-${name}`}
            onChange={onChange}
          />
          <span>{unit}</span>
        </>
      )}
      {type === 'textarea' && (
        <textarea
          type={type}
          name={name}
          id={`input-${name}`}
          onChange={onChange}
        />
      )}
      {type === 'select' && (
      <select
        name={name}
        id={`input-${name}`}
        onChange={onChange}
      >
        {
          selectOptions.map((option, index) => (
            <option key={`input-${name}-${index}`}>
              {option}
            </option>
          ))
        }
      </select>
      )}
    </p>
  );
}
