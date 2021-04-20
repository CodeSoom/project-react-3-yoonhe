import styled from '@emotion/styled';

export const Form = styled.form({
  display: 'flex',
  flexDirection: 'column',
});

export const Input = styled.input({
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
