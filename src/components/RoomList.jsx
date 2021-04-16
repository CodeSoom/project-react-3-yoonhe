import React from 'react';

import styled from '@emotion/styled';

import { getMediaQuery } from '../../utils';

const breakpoints = [1100, 1200, 1600];
const mediaQuery = getMediaQuery(breakpoints);

const List = styled.ul({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '1rem',
  marginTop: '1rem',
});

const ListItem = styled.li({
  width: '24%',
  position: 'relative',
  padding: '21rem 2rem 2rem 2rem',
  borderRadius: '2rem',
  background: '#fff',
  overflow: 'hidden',
  transition: '0.3s linear',
  '&:hover': {
    boxShadow: '0 2px 15px rgb(0 0 0 / 30%)',
    transform: 'scale(1.02)',
  },
  [mediaQuery[1600]]: {
    width: '32%',
  },
  [mediaQuery[1200]]: {
    width: '49%',
  },
  [mediaQuery[1100]]: {
    padding: '2rem 2rem 2rem 21rem',
    width: '100%',
  },
});

const ScoreBox = styled.div({
  h3: {
    color: '#999',
    fontSize: '1rem',
    fontWeight: 'normal',
  },
  '& + &': {
    margin: '0.8rem 0 0 0',
  },
});

const ScoreTop = styled.div({
  fontSize: '1.2rem',
  textAlign: 'center',
  '& > * + *': {
    marginTop: '0.4em',
  },
  span: {
    display: 'block',
  },
  em: {
    color: '#75A293',
  },
});

const ScoreBar = styled.p({
  display: 'flex',
  marginTop: '0.3rem',
  borderRadius: '20px',
  background: '#F6F7FB',
  overflow: 'hidden',
});

const ScoreBarItem = styled.span(({ check }) => ({
  /* background: #75A293, */
  flex: 1,
  display: 'inline-block',
  padding: '0.8rem',
  fontSize: 0,
  background: check && '#75A293',
  '& + &': {
    borderLeft: '2px solid #fff',
  },
}));

const ListImage = styled.div({
  position: 'absolute',
  left: '0',
  top: '0',
  width: '100%',
  height: '19rem',
  '& img': {
    width: '100%',
    height: '100%',
  },
  p: {
    display: 'none',
  },
  [mediaQuery[1100]]: {
    width: '19rem',
    height: '100%',
  },
});

export default function RoomList({ rooms }) {
  const scores = [1, 2, 3, 4, 5];

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
                <ScoreTop>
                  <em>{moveInType}</em>
                  <span>{address}</span>
                  <span>
                    {' '}
                    {monthlyRent}
                    /
                    {deposit}
                  </span>
                </ScoreTop>
                <ScoreBox>
                  <h3>채광 ☀️</h3>
                  <ScoreBar>
                    {scores.map((score, index) => (
                      <ScoreBarItem
                        key={`lightning_score_${index}`}
                        check={score <= lightning}
                      >
                        {score}
                      </ScoreBarItem>
                    ))}
                  </ScoreBar>
                </ScoreBox>
                <ScoreBox>
                  <h3>습기 💧️</h3>
                  <ScoreBar>
                    {scores.map((score, index) => (
                      <ScoreBarItem
                        key={`moisture_score_${index}`}
                        check={score <= moisture}
                      >
                        {score}
                      </ScoreBarItem>
                    ))}
                  </ScoreBar>
                </ScoreBox>
                <ScoreBox>
                  <h3>통풍 🍃</h3>
                  <ScoreBar>
                    {scores.map((score, index) => (
                      <ScoreBarItem
                        key={`ventilation_score_${index}`}
                        check={score <= ventilation}
                      >
                        {score}
                      </ScoreBarItem>
                    ))}
                  </ScoreBar>
                </ScoreBox>
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
