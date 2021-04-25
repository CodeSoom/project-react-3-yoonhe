import React from 'react';

import { fireEvent, render, waitFor } from '@testing-library/react';

import AddRoomImageControls from './AddRoomImageControls';

describe('AddRoomImageControls', () => {
  const handleChange = jest.fn();

  beforeEach(() => {
    jest.resetAllMocks();
  });

  function renderAddRoomImageControls() {
    return render(<AddRoomImageControls
      onChange={handleChange}
      images={given.images || []}
    />);
  }

  it('renders image upload control', () => {
    const { queryByText } = renderAddRoomImageControls();

    expect(queryByText('방 사진 등록하기')).not.toBeNull();
  });

  it('calls onChange handler when input file change', async () => {
    const { getByLabelText } = renderAddRoomImageControls();

    await waitFor(() => {
      fireEvent.change(getByLabelText('방 사진 등록하기'), {
        target: {
          files: {
            0: {
              name: 'test.png',
            },
          },
        },
      });
    });

    expect(handleChange).toBeCalledWith({
      files: {
        0: {
          name: 'test.png',
        },
      },
    });
  });

  context('with upload images', () => {
    given('images', () => ['IMAGE_URL_1', 'IMAGE_URL_2']);
    it('renders room images', () => {
      const { queryAllByTitle } = renderAddRoomImageControls();

      expect(queryAllByTitle('방 사진')).toHaveLength(2);
    });
  });

  context('without upload images', () => {
    given('images', () => []);
    it('renders room images', () => {
      const { queryByTitle } = renderAddRoomImageControls();

      expect(queryByTitle('방 사진')).toBeNull();
    });
  });
});
