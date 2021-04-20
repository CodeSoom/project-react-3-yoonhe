import React from 'react';

import styeld from '@emotion/styled';

import SignUpContainer from '../container/SignUpContainer';

const Section = styeld.section({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  flex: 1,
  height: '100%',
  background: '#fff',
});

const Inner = styeld.div({
  padding: '3rem',
  maxWidth: '700px',
  width: '100%',
});

const Title = styeld.h2({
  fontSize: '3rem',
  marginBottom: '1.3em',
  textAlign: 'center',
  color: '#75A293',
});

export default function SignUpPage() {
  return (
    <Section>
      <Inner>
        <Title>회원가입</Title>
        <SignUpContainer />
      </Inner>
    </Section>
  );
}
