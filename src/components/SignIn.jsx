import React from 'react';

import styled from '@emotion/styled';

import { getMediaQuery } from '../../utils';

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

const Form = styled.form({
  display: 'flex',
  flexDirection: 'column',
});

const Input = styled.input({
  padding: '1.5em 1rem',
  fontSize: '1.1rem',
  background: '#F6F7FB',
  color: '#777',
  '&::placeholder': {
    color: '#999',
  },
  '& + &': {
    marginTop: '1rem',
  },
});

const ErrorMessage = styled.p({
  marginTop: '1rem',
});

const ButtonBox = styled.div({
  display: 'flex',
  flexDirection: 'column',
  marginTop: '3rem',
});

const Button = styled.button({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  fontSize: '1.3rem',
  padding: '0.8em',
  borderRadius: '2rem',
  textAlign: 'center',
  color: '#fff',
  background: '#75A293',
  cursor: 'pointer',
  '&+&': {
    marginTop: '1rem',
  },
  [[mediaQuery[768]]]: {
    fontSize: '1.1rem',
  },
});

export default function SignIn({
  onChange, onSubmit, onClick, fields, loginError,
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
      <Logo>Room Preview 🏠</Logo>
      <Form onSubmit={handleSubmit}>
        <Input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={handleChange}
        />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={handleChange}
        />
        {loginError && <ErrorMessage>{loginError}</ErrorMessage> }
        <ButtonBox>
          <Button type="submit">방보러 가볼까요? 👉🏻</Button>
          <Button type="button" onClick={onClick}>로그인 없이 구경하기 👀</Button>
        </ButtonBox>
      </Form>
    </>
  );
}
