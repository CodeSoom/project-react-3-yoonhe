import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import Intro from './Intro';

describe('Intro', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  const handleClick = jest.fn();

  function renderIntro() {
    return render(<Intro onClick={handleClick} />);
  }
  it('renders welcome messages and service Introduction', () => {
    const { queryByText } = renderIntro();

    expect(queryByText('Welcome, RoomPreview!')).not.toBeNull();
    expect(queryByText('이 서비스는 여러분이 살고싶은 집에 미리 살아본 사람들의 경험담을 공유하여 여러분이 후회없는 선택을 할 수 있도록 도와줍니다')).not.toBeNull();
  });

  it('renders "회원가입" button', () => {
    const { queryByText } = renderIntro();

    expect(queryByText('회원가입')).not.toBeNull();
  });

  it('calls onClick hanlder when click "회원가입" button', () => {
    const { getByText } = renderIntro();

    fireEvent.click(getByText('회원가입'));

    expect(handleClick).toBeCalledWith('/signup');
  });
});
