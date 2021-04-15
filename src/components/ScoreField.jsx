import React from 'react';

export default function ScoreField({
  label,
  name,
  onChange,
  scores,
}) {
  function handleChange({ event, score }) {
    const { target: { name } } = event;

    onChange({ name, value: score });
  }
  return (
    <p>
      <span>
        {label}
      </span>
      <em>
        {scores.map((score) => (
          <span key={`radio-${name}-${score}`}>
            <label htmlFor={`radio-${name}-${score}`}>{score}</label>
            <input
              type="radio"
              name={name}
              id={`radio-${name}-${score}`}
              onChange={(event) => handleChange({ event, score })}
            />
          </span>
        ))}
      </em>
    </p>
  );
}
