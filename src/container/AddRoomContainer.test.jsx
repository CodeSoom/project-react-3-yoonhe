import React from 'react';

import { fireEvent, render, waitFor } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';

import AddRoomContainer from './AddRoomContainer';

jest.mock('../service/api');

describe('AddRoomContainer', () => {
  const dispatch = jest.fn();
  const handleGoToMain = jest.fn();

  beforeEach(() => {
    jest.resetAllMocks();

    useSelector.mockImplementation((selector) => selector({
      isLoggedIn: given.isLoggedIn || false,
      addRoomFields: {
        address: '',
        moveInType: '',
        deposit: '',
        monthlyRent: '',
        adminCost: '',
        images: given.images || [],
      },
    }));

    useDispatch.mockImplementation(() => dispatch);
  });

  function renderAddRoomContainer() {
    return render(<AddRoomContainer onGoToMain={handleGoToMain} />);
  }

  context('when logged in', () => {
    given('isLoggedIn', () => true);

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
          type: 'roomPreviews/changeAddRoomFields',
          payload: {
            name,
            value,
          },
        });
      });
    });

    it('renders image upload control', () => {
      const { queryByText } = renderAddRoomContainer();

      expect(queryByText('방 사진 등록하기')).not.toBeNull();
    });

    it('calls onChange handler when input file change', async () => {
      const { getByLabelText } = renderAddRoomContainer();

      await waitFor(() => {
        fireEvent.change(getByLabelText('방 사진 등록하기'), {
          target: {
            files: {
              0: {
                name: 'test.png',
              },
            },
          },
        });
      });

      expect(dispatch).toBeCalled();
    });

    it('renders "등록하기" button', () => {
      const { queryByText } = renderAddRoomContainer();

      expect(queryByText('등록하기')).not.toBeNull();
    });

    it('calls onSubmit handler when "등록하기" button click', () => {
      const { getByText } = renderAddRoomContainer();

      fireEvent.click(getByText('등록하기'));

      expect(dispatch).toBeCalled();
      expect(handleGoToMain).toBeCalled();
    });

    context('with upload images', () => {
      given('images', () => ['IMAGE_URL_1', 'IMAGE_URL_2']);
      it('renders room images', () => {
        const { queryAllByTitle } = renderAddRoomContainer();

        expect(queryAllByTitle('방 사진')).toHaveLength(2);
      });
    });

    context('without upload images', () => {
      given('images', () => []);
      it('renders room images', () => {
        const { queryByTitle } = renderAddRoomContainer();

        expect(queryByTitle('방 사진')).toBeNull();
      });
    });
  });

  context('when logged out', () => {
    given('isLoggedIn', () => false);

    it('renders login request message', () => {
      const { getByText } = renderAddRoomContainer();

      expect(getByText('로그인이 필요한 페이지 입니다')).not.toBeNull();
    });
  });
});
