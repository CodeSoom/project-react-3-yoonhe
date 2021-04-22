import React from 'react';

import * as FormStyle from '../styles/form';
import * as ButtonStyle from '../styles/button';

export default function SignUp({ onChange, onSubmit, error }) {
  function handleChange(event) {
    const { target } = event;
    const { name, value } = target;

    onChange({ name, value });
  }

  return (
    <div>
      <FormStyle.Form onSubmit={onSubmit}>
        <FormStyle.Input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />
        <FormStyle.Input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />
        {error && (
        <FormStyle.ErrorMessage>
          {error}
        </FormStyle.ErrorMessage>
        )}
        <ButtonStyle.ButtonBox>
          <ButtonStyle.Button
            type="submit"
          >
            완료
          </ButtonStyle.Button>
        </ButtonStyle.ButtonBox>
      </FormStyle.Form>
    </div>
  );
}
