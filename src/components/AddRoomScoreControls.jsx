import React from 'react';

import ScoreField from './ScoreField';

export default function AddRoomScoreControls({ onChange }) {
  const scores = [1, 2, 3, 4, 5];

  return (
    <div>
      <div>
        <p>아래의 항목들에 대한 경험 점수를 체크해주세요.</p>
        <p>예시) 해충이 많아서 해충에 대한 경험이 좋지않다 - 1점</p>
      </div>
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
