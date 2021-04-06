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

    expect(queryByLabelText('주소')).not.toBeNull();
    expect(queryByLabelText('입주 유형')).not.toBeNull();
    expect(queryByLabelText('보증금')).not.toBeNull();
    expect(queryByLabelText('월세')).not.toBeNull();
    expect(queryByLabelText('관리비')).not.toBeNull();
  });

  it('renders input radio controls', () => {
    const { queryByText, queryAllByLabelText } = renderAddRoomContainer();

    expect(queryByText('채광 나쁨')).not.toBeNull();
    expect(queryByText('채광 좋음')).not.toBeNull();
    expect(queryByText('통풍 나쁨')).not.toBeNull();
    expect(queryByText('통풍 좋음')).not.toBeNull();
    expect(queryByText('습기 적음')).not.toBeNull();
    expect(queryByText('습기 많음')).not.toBeNull();
    expect(queryByText('해충 적음')).not.toBeNull();
    expect(queryByText('해충 많음')).not.toBeNull();
    expect(queryByText('소음 적음')).not.toBeNull();
    expect(queryByText('소음 많음')).not.toBeNull();

    expect(queryAllByLabelText('1')).not.toBeNull();
    expect(queryAllByLabelText('2')).not.toBeNull();
    expect(queryAllByLabelText('3')).not.toBeNull();
    expect(queryAllByLabelText('4')).not.toBeNull();
    expect(queryAllByLabelText('5')).not.toBeNull();
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
