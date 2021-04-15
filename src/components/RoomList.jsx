import React from 'react';

import styled from '@emotion/styled';

const List = styled.ul({
  marginTop: '1rem',
});

const ListItem = styled.li({
  position: 'relative',
  padding: '2rem 18rem 2rem 2rem',
  borderRadius: '2rem',
  background: '#fff',
  overflow: 'hidden',
  transition: '0.3s linear',
  '& + &': {
    marginTop: '1rem',
  },
  '&:hover': {
    boxShadow: '0 2px 15px rgb(0 0 0 / 30%)',
    transform: 'scale(1.02)',
  },
});

const ListImage = styled.div({
  position: 'absolute',
  right: '0',
  top: '0',
  width: '16rem',
  height: '100%',
  '& img': {
    width: '100%',
    height: '100%',
  },
});

export default function RoomList({ rooms }) {
  return (
    <>
      {rooms && rooms.length ? (
        <List>
          {rooms.map((room) => {
            const {
              id,
              address,
              moveInType,
              monthlyRent,
              deposit,
              lightning,
              moisture,
              ventilation,
              images,
            } = room;
            return (
              <ListItem key={id}>
                <div>
                  <span>{address}</span>
                  <span>
                    {moveInType}
                    {' '}
                    {monthlyRent}
                    /
                    {deposit}
                  </span>
                </div>
                <div>
                  <p>채광 ☀️</p>
                  <p>{lightning}</p>
                </div>
                <div>
                  <p>습기 💧️</p>
                  <p>{moisture}</p>
                </div>
                <div>
                  <p>통풍 🍃</p>
                  <p>{ventilation}</p>
                </div>
                <ListImage>
                  <img src={images[0]} alt="방 이미지" />
                  <p>
                    <span>방보러 갈까요?</span>
                  </p>
                </ListImage>
              </ListItem>
            );
          })}
        </List>
      ) : <p>등록된 방이 없습니다</p>}
    </>
  );
}
