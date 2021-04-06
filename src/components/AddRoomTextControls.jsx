import React from 'react';

export default function AddRoomTextControls({ onChange }) {
  function handleChange(e) {
    const { target: { name, value } } = e;

    onChange({ name, value });
  }

  return (
    <div>
      <p>
        <label htmlFor="input-address">주소</label>
        <textarea
          type="text"
          name="address"
          id="input-address"
          onChange={handleChange}
        />
      </p>
      <p>
        <label htmlFor="input-moveInType">입주 유형</label>
        <input
          type="text"
          name="moveInType"
          id="input-moveInType"
          onChange={handleChange}
        />
      </p>
      <p>
        <label htmlFor="input-deposit">보증금</label>
        <input
          type="text"
          name="deposit"
          id="input-deposit"
          onChange={handleChange}
        />
      </p>
      <p>
        <label htmlFor="input-monthlyRent">월세</label>
        <input
          type="text"
          name="monthlyRent"
          id="input-monthlyRent"
          onChange={handleChange}
        />
      </p>
      <p>
        <label htmlFor="input-adminCost">관리비</label>
        <input
          type="text"
          name="adminCost"
          id="input-adminCost"
          onChange={handleChange}
        />
      </p>
    </div>
  );
}
