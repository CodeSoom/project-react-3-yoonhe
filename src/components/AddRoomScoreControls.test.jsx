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

    expect(queryByText('채광')).not.toBeNull();
    expect(queryByText('통풍')).not.toBeNull();
    expect(queryByText('습기')).not.toBeNull();
    expect(queryByText('해충')).not.toBeNull();
    expect(queryByText('소음')).not.toBeNull();

    expect(queryAllByLabelText('1')).not.toBeNull();
    expect(queryAllByLabelText('2')).not.toBeNull();
    expect(queryAllByLabelText('3')).not.toBeNull();
    expect(queryAllByLabelText('4')).not.toBeNull();
    expect(queryAllByLabelText('5')).not.toBeNull();
  });
});
