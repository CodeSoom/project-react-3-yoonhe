import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import AddRoomScoreControls from '../components/AddRoomScoreControls';
import AddRoomTextControls from '../components/AddRoomTextControls';

import {
  setAddRoomFields,
  setAddRoomImagesField,
} from '../slice';

import { get, readFile } from '../../utils';

export default function AddRoomContainer() {
  const addRoomFields = useSelector(get('addRoomFields'));
  const { images } = addRoomFields;

  const dispatch = useDispatch();

  function handleChange({ name, value }) {
    dispatch(setAddRoomFields({ name, value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
  }

  async function handleFileChange(event) {
    const { files } = event.target;

    const getImagePromises = [].map.call(files, async (file) => {
      const result = await readFile(file);
      return result;
    });

    const uploadImages = await Promise.all(getImagePromises);

    dispatch(setAddRoomImagesField(uploadImages));
  }

  return (
    <div>
      <h2>살았던 혹은 살고계신 방을 알려주세요 😊</h2>
      <form onSubmit={handleSubmit}>
        <AddRoomTextControls onChange={handleChange} />
        <AddRoomScoreControls onChange={handleChange} />
        <div>
          <p>
            <label htmlFor="input-upload">방 사진 등록하기</label>
            <input
              id="input-upload"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              multiple
            />
          </p>
          <ul>
            {images.map((image) => (
              <li key={`uploadImage${new Date()}`}>
                <img src={image} width="50px" height="50px" />
              </li>
            ))}
          </ul>
        </div>
        <button type="submit">등록하기</button>
      </form>
    </div>
  );
}
