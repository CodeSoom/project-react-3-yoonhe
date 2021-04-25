import React from 'react';

import styeld from '@emotion/styled';

const ScoreWrap = styeld.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '1em',
  background: '#fff',
  '& + &': {
    marginTop: '1em',
  },
});

const Scores = styeld.p({
  display: 'flex',
  marginLeft: '1em',
});

const Score = styeld.span({
  marginRight: '1em',
  input: {
    display: 'none',
  },
  label: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '25px',
    height: '25px',
    borderRadius: '50%',
    border: '1px solid #dcdcdc',
    cursor: 'pointer',
  },
  'input:checked + label': {
    background: '#75A293',
    color: '#fff',
  },
  'label:hover': {
    background: '#75A293',
    color: '#fff',
  },
});

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
    <ScoreWrap>
      <p>
        {label}
      </p>
      <Scores>
        {scores.map((score) => (
          <Score key={`radio-${name}-${score}`}>
            <input
              type="radio"
              name={name}
              id={`radio-${name}-${score}`}
              onChange={(event) => handleChange({ event, score })}
            />
            <label htmlFor={`radio-${name}-${score}`}>{score}</label>
          </Score>
        ))}
      </Scores>
    </ScoreWrap>
  );
}
