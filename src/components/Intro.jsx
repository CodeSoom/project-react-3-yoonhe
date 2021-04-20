import React from 'react';

import styled from '@emotion/styled';

const IntroSection = styled.section({
  display: 'flex',
  flex: '1',
  padding: '2em',
  height: '100%',
  textAlign: 'center',
  color: '#fff',
  background: '#75A293',
  '& > div': {
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',
  },
});

const Title = styled.h2({
  fontSize: '2.5rem',
  marginBottom: '1em',
});

const Description = styled.p({
  fontSize: '1.5rem',
  wordBreak: 'keep-all',
  lineHeight: '1.7',
});

const ButtonBox = styled.p({
  marginTop: '2rem',
  padding: '0 2rem',
  button: {
    fontSize: '1.3rem',
    padding: '0.8em',
    width: '100%',
    borderRadius: '2rem',
    color: '#fff',
    border: '1px solid #fff',
  },
});

export default function Intro({ onClick }) {
  return (
    <IntroSection>
      <div>
        <Title>Welcome, RoomPreview!</Title>
        <Description>
          이 서비스는 여러분이 살고싶은 집에 미리 살아본 사람들의 경험담을 공유하여 여러분이 후회없는 선택을 할 수 있도록 도와줍니다
        </Description>
        <ButtonBox>
          <button
            type="button"
            onClick={() => onClick('/signup')}
          >
            회원가입

          </button>
        </ButtonBox>
      </div>
    </IntroSection>
  );
}
