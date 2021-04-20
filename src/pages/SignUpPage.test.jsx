import React from 'react';

import { render } from '@testing-library/react';

import SignUpPage from './SignUpPage';

jest.mock('react-redux');
jest.mock('../service/api');

describe('SignUpPage', () => {
  it('renders SignUpPage', () => {
    const { queryByText } = render(<SignUpPage />);

    expect(queryByText('회원가입')).not.toBeNull();
  });
});
