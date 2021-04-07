import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import ScoreField from './ScoreField';

describe('ScoreField', () => {
  const SCORES = [1, 2, 3, 4, 5];

  beforeEach(() => {
    jest.resetAllMocks();
  });

  const handleChange = jest.fn();

  function renderScoreField() {
    return render(<ScoreField
      label="채광"
      name="lightning"
      onChange={handleChange}
      scores={SCORES}
    />);
  }

  it('renders input radio control', () => {
    const { queryByLabelText } = renderScoreField();

    SCORES.forEach((score) => {
      expect(queryByLabelText(score)).not.toBeNull();
    });
  });

  it('calls onChange handler when radio click', () => {
    const { getByLabelText } = renderScoreField();

    SCORES.forEach((score) => {
      fireEvent.click(getByLabelText(score));

      expect(handleChange).toBeCalledWith({
        name: 'lightning',
        value: score,
      });
    });
  });
});
