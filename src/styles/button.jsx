import styled from '@emotion/styled';

import { getMediaQuery } from '../../utils';

const breakpoints = [1000, 768];
const mediaQuery = getMediaQuery(breakpoints);

export const ButtonBox = styled.div({
  display: 'flex',
  flexDirection: 'column',
  marginTop: '3rem',
});

export const Button = styled.button({
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
