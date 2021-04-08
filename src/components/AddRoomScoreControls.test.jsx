import React from 'react';

import { render } from '@testing-library/react';

import AddRoomScoreControls from './AddRoomScoreControls';

describe('AddRoomScoreControls', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  const handleChange = jest.fn();

  function renderAddRoomScoreControls() {
    return render(<AddRoomScoreControls onChange={handleChange} />);
  }

  it('renders "How to check your score" messages ', () => {
    const { queryByText } = renderAddRoomScoreControls();

    expect(queryByText('아래의 항목들에 대한 경험 점수를 체크해주세요.')).not.toBeNull();
    expect(queryByText('예시) 해충이 많아서 해충에 대한 경험이 좋지않다 - 1점')).not.toBeNull();
  });

  it('renders input radio controls', () => {
    const { queryByText, queryAllByLabelText } = renderAddRoomScoreControls();

    const categories = ['채광', '통풍', '습기', '해충', '소음'];
    const scores = [1, 2, 3, 4, 5];

    categories.forEach((category) => {
      expect(queryByText(category)).not.toBeNull();
    });

    scores.forEach((score) => {
      expect(queryAllByLabelText(score)).not.toBeNull();
    });
  });
});
