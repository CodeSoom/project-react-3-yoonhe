import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import AddRoomTextControls from './AddRoomTextControls';

describe('AddRoomTextControls', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  const handleChange = jest.fn();

  function renderAddRoomTextControls() {
    return render(<AddRoomTextControls onChange={handleChange} />);
  }

  it('renders inpt text controls', () => {
    const { queryByLabelText } = renderAddRoomTextControls();

    expect(queryByLabelText('주소')).not.toBeNull();
    expect(queryByLabelText('입주 유형')).not.toBeNull();
    expect(queryByLabelText('보증금')).not.toBeNull();
    expect(queryByLabelText('월세')).not.toBeNull();
    expect(queryByLabelText('관리비')).not.toBeNull();
  });

  it('calls onChange handler when input change', () => {
    const { queryByLabelText } = renderAddRoomTextControls();

    const controls = [
      {
        label: '주소',
        name: 'address',
        value: '서울시 강남구 역삼동',
      },
      {
        label: '입주 유형',
        name: 'moveInType',
        value: '전세',
      },
      {
        label: '보증금',
        name: 'deposit',
        value: '10000',
      },
      {
        label: '월세',
        name: 'monthlyRent',
        value: '0',
      },
      {
        label: '관리비',
        name: 'adminCost',
        value: '10',
      },
    ];

    controls.forEach(({ label, name, value }) => {
      fireEvent.change(queryByLabelText(label), {
        target: {
          value,
        },
      });

      expect(handleChange).toBeCalledWith({
        name,
        value,
      });
    });
  });
});
