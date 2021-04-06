import React from 'react';

import TextField from './TextField';

export default function AddRoomTextControls({ onChange }) {
  function handleChange(e) {
    const { target: { name, value } } = e;

    onChange({ name, value });
  }

  return (
    <div>
      <TextField
        label="주소"
        type="text"
        name="address"
        onChange={handleChange}
        formType="textarea"
      />
      <TextField
        label="입주 유형"
        type="text"
        name="moveInType"
        onChange={handleChange}
      />
      <TextField
        label="보증금"
        type="text"
        name="deposit"
        onChange={handleChange}
      />
      <TextField
        label="월세"
        type="text"
        name="monthlyRent"
        onChange={handleChange}
      />
      <TextField
        label="관리비"
        type="text"
        name="adminCost"
        onChange={handleChange}
      />
    </div>
  );
}
