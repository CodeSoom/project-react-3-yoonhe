import React from 'react';

import styled from '@emotion/styled';

import { getMediaQuery } from '../../utils';

import * as FormStyle from '../styles/form';
import * as ButtonStyle from '../styles/button';

const breakpoints = [1000, 768];
const mediaQuery = getMediaQuery(breakpoints);

const Logo = styled.h1({
  marginBottom: '1.3em',
  fontSize: '3rem',
  color: '#75A293',
  [[mediaQuery[768]]]: {
    fontSize: '2rem',
  },
});

export default function SignIn({
  fields, loginError,
  onChange, onSubmit, onClick,
}) {
  const { email, password } = fields;

  function handleChange(event) {
    const { target } = event;
    const { name, value } = target;

    onChange({ name, value });
  }

  function handleSubmit(event) {
    event.preventDefault();

    onSubmit();
  }

  return (
    <>
      <Logo>Room Preview ๐ </Logo>
      <FormStyle.Form onSubmit={handleSubmit}>
        <FormStyle.Input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={handleChange}
        />
        <FormStyle.Input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={handleChange}
        />
        {loginError && (
        <FormStyle.ErrorMessage>
          {loginError}
        </FormStyle.ErrorMessage>
        ) }
        <ButtonStyle.ButtonBox>
          <ButtonStyle.Button type="submit">๋ฐฉ๋ณด๋ฌ ๊ฐ๋ณผ๊น์? ๐๐ป</ButtonStyle.Button>
          <ButtonStyle.Button
            type="button"
            onClick={() => onClick('/main')}
          >
            ๋ก๊ทธ์ธ ์์ด ๊ตฌ๊ฒฝํ๊ธฐ ๐

          </ButtonStyle.Button>
        </ButtonStyle.ButtonBox>
      </FormStyle.Form>
    </>
  );
}
