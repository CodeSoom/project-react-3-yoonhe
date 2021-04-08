import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';

import AddRoomContainer from './AddRoomContainer';

jest.mock('../service/api');

describe('AddRoomContainer', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    jest.resetAllMocks();

    useSelector.mockImplementation((selector) => selector({
      addRoomFields: {
        address: '',
        moveInType: '',
        deposit: '',
        monthlyRent: '',
        adminCost: '',
      },
    }));

    useDispatch.mockImplementation(() => dispatch);
  });

  function renderAddRoomContainer() {
    return render(<AddRoomContainer />);
  }

  it('renders addRoom title', () => {
    const { queryByText } = renderAddRoomContainer();

    expect(queryByText('살았던 혹은 살고계신 방을 알려주세요 😊')).not.toBeNull();
  });

  it('renders input text controls', () => {
    const { queryByLabelText } = renderAddRoomContainer();

    const labels = ['주소', '입주 유형', '보증금', '월세', '관리비'];

    labels.forEach((label) => {
      expect(queryByLabelText(label)).not.toBeNull();
    });
  });

  it('renders input radio controls', () => {
    const { queryByText, queryAllByLabelText } = renderAddRoomContainer();

    const categories = ['채광', '통풍', '습기', '해충', '소음'];
    const scores = [1, 2, 3, 4, 5];

    categories.forEach((category) => {
      expect(queryByText(category)).not.toBeNull();
    });

    scores.forEach((score) => {
      expect(queryAllByLabelText(score)).not.toBeNull();
    });
  });

  it('calls onChange handler when input change', () => {
    const { queryByLabelText } = renderAddRoomContainer();

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

      expect(dispatch).toBeCalledWith({
        type: 'roomPreviews/setAddRoomFields',
        payload: {
          name,
          value,
        },
      });
    });
  });
});
