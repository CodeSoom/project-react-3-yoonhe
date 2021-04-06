import React from 'react';
import { useDispatch } from 'react-redux';

import AddRoomTextControls from '../components/AddRoomTextControls';
import { setAddRoomFields } from '../slice';

export default function AddRoomContainer() {
  const dispatch = useDispatch();

  const scores = [1, 2, 3, 4, 5];

  function handleChange({ name, value }) {
    dispatch(setAddRoomFields({ name, value }));
  }

  return (
    <div>
      <h2>살았던 혹은 살고계신 방을 알려주세요 😊</h2>
      <form>
        <AddRoomTextControls onChange={handleChange} />
        <div>
          <p>
            <span>채광 나쁨</span>
            <em>
              {scores.map((number) => (
                <span key={`radio-lightning-${number}`}>
                  <label htmlFor={`radio-lightning-${number}`}>{number}</label>
                  <input type="radio" name="lightning" id={`radio-lightning-${number}`} />
                </span>
              ))}
            </em>
            <span>채광 좋음</span>
          </p>
          <p>
            <span>통풍 나쁨</span>
            <em>
              {scores.map((number) => (
                <span key={`radio-ventilation-${number}`}>
                  <label htmlFor={`radio-ventilation-${number}`}>{number}</label>
                  <input type="radio" name="ventilation" id={`radio-ventilation-${number}`} />
                </span>
              ))}
            </em>
            <span>통풍 좋음</span>
          </p>
          <p>
            <span>습기 적음</span>
            <em>
              {scores.map((number) => (
                <span key={`radio-moisture-${number}`}>
                  <label htmlFor={`radio-moisture-${number}`}>{number}</label>
                  <input type="radio" name="moisture" id={`radio-moisture-${number}`} />
                </span>
              ))}
            </em>
            <span>습기 많음</span>
          </p>
          <p>
            <span>해충 적음</span>
            <em>
              {scores.map((number) => (
                <span key={`radio-worm-${number}`}>
                  <label htmlFor={`radio-worm-${number}`}>{number}</label>
                  <input type="radio" name="worm" id={`radio-worm-${number}`} />
                </span>
              ))}
            </em>
            <span>해충 많음</span>
          </p>
          <p>
            <span>소음 적음</span>
            <em>
              {scores.map((number) => (
                <span key={`radio-noise-${number}`}>
                  <label htmlFor={`radio-noise-${number}`}>{number}</label>
                  <input type="radio" name="noise" id={`radio-noise-${number}`} />
                </span>
              ))}
            </em>
            <span>소음 많음</span>
          </p>
        </div>
      </form>
    </div>
  );
}
