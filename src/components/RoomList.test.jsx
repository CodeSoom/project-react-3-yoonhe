import { render } from '@testing-library/react';
import React from 'react';

import RoomList from './RoomList';

import ROOMS from '../../fixtures/rooms';

describe('Rooms', () => {
  function renderRooms(rooms) {
    return render((
      <RoomList rooms={rooms} />
    ));
  }

  context('with rooms', () => {
    it('renders room scroe controls', () => {
      const { queryByText } = renderRooms(ROOMS);

      const categories = ['채광 ☀️', '습기 💧️', '통풍 🍃'];

      categories.forEach((category) => {
        expect(queryByText(category)).not.toBeNull();
      });
    });

    it('renders room images', () => {
      const { queryByAltText } = renderRooms(ROOMS);

      expect(queryByAltText('방 이미지')).not.toBeNull();
    });
  });

  context('without rooms', () => {
    it('renders "등록된 방이 없습니다" message', () => {
      const { queryByText } = renderRooms([]);

      expect(queryByText('등록된 방이 없습니다')).not.toBeNull();
    });
  });
});
