import React from 'react';

export default function RoomList({ rooms }) {
  return (
    <>
      {rooms && rooms.length ? (
        <ul>
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
            } = room;
            return (
              <li key={id}>
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
              </li>
            );
          })}
        </ul>
      ) : <p>등록된 방이 없습니다</p>}
    </>
  );
}