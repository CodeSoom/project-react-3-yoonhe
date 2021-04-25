import React from 'react';

import styeld from '@emotion/styled';

const InputWrap = styeld.p({
  display: 'flex',
  justifyContent: 'space-between',
  padding: '1em',
  background: '#fff',
  '& + &': {
    marginTop: '1em',
  },
  'label + *': {
    flex: 1,
    marginLeft: '1em',
  },
  input: {
    textAlign: 'right',
  },
  select: {
    maxWidth: '100px',
  },
  textarea: {
    maxWidth: '300px',
  },
  'input + span': {
    marginLeft: '0.5em',
  },
});

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
    <InputWrap>
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
    </InputWrap>
  );
}
