import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import TextField from './TextField';

describe('TextField', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  const handleChange = jest.fn();

  function renderTextField() {
    return render(<TextField
      label="주소"
      type="text"
      name="address"
      onChange={handleChange}
    />);
  }

  it('renders input text control', () => {
    const { queryByLabelText } = renderTextField();

    expect(queryByLabelText('주소')).not.toBeNull();
  });

  it('calls onChange handler when input change', () => {
    const { queryByLabelText } = renderTextField();

    fireEvent.change(queryByLabelText('주소'), {
      target: {
        value: '서울시 강남구',
      },
    });

    expect(handleChange).toBeCalled();
  });
});
