import React from 'react';

import styled from '@emotion/styled';

import { BiUpload } from 'react-icons/bi';
import { getMediaQuery } from '../../utils';

const breakpoints = [900, 500];
const mediaQuery = getMediaQuery(breakpoints);

const Upload = styled.p({
  marginTop: '2em',
  label: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '1em',
    background: '#fff',
    border: '1px solid #dcdcdc',
    cursor: 'pointer',
    span: {
      lineHeight: 1,
      marginRight: '1em',
    },
  },
  input: {
    display: 'none',
  },
});

const Images = styled.ul({
  display: 'flex',
  flexWrap: 'wrap',
  marginTop: '1em',
});

const Image = styled.li({
  padding: '1em',
  width: '33.3%',
  background: '#fff',
  img: {
    width: '100%',
  },
  [mediaQuery[500]]: {
    width: '50%',
  },
});

export default function AddRoomImageControls({ images, onChange }) {
  function handleChange(event) {
    const { files } = event.target;

    onChange({ files });
  }

  return (
    <div>
      <Upload>
        <label htmlFor="input-upload">
          <span><BiUpload /></span>
          방 사진 등록하기
        </label>
        <input
          id="input-upload"
          type="file"
          accept="image/*"
          onChange={handleChange}
          multiple
        />
      </Upload>
      <Images>
        {images.map((image) => (
          <Image key={image}>
            <img
              src={image}
              title="방 사진"
            />
          </Image>
        ))}
      </Images>
    </div>
  );
}
