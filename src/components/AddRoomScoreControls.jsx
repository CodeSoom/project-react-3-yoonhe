import React from 'react';

import { AiOutlineQuestionCircle } from 'react-icons/ai';

import styled from '@emotion/styled';

import ScoreField from './ScoreField';

const Description = styled.div({
  position: 'relative',
  padding: '1em 1em 1em 2.5em',
  marginBottom: '1em',
  background: '#fff',
  em: {
    position: 'absolute',
    left: '1em',
    top: '1em',
  },
});

export default function AddRoomScoreControls({ onChange }) {
  const scores = [1, 2, 3, 4, 5];

  return (
    <div>
      <Description>
        <em><AiOutlineQuestionCircle /></em>
        <p>아래의 항목들에 대한 경험 점수를 체크해주세요.</p>
        <p>예시) 해충이 많아서 해충에 대한 경험이 좋지않다 - 1점</p>
      </Description>
      <ScoreField
        label="채광"
        name="lightning"
        onChange={onChange}
        scores={scores}
      />
      <ScoreField
        label="통풍"
        name="ventilation"
        onChange={onChange}
        scores={scores}
      />
      <ScoreField
        label="습기"
        name="moisture"
        onChange={onChange}
        scores={scores}
      />
      <ScoreField
        label="해충"
        name="worm"
        onChange={onChange}
        scores={scores}
      />
      <ScoreField
        label="소음"
        name="noise"
        onChange={onChange}
        scores={scores}
      />
    </div>
  );
}
