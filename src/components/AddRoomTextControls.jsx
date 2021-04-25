import React from 'react';

import TextField from './TextField';

export default function AddRoomTextControls({ onChange }) {
  function handleChange(event) {
    const { target: { name, value } } = event;

    onChange({ name, value });
  }

  return (
    <div>
      <TextField
        label="주소"
        type="textarea"
        name="address"
        onChange={handleChange}
      />
      <TextField
        label="입주 유형"
        type="select"
        name="moveInType"
        onChange={handleChange}
        selectOptions={['전세', '월세']}
      />
      <TextField
        label="보증금"
        type="number"
        name="deposit"
        onChange={handleChange}
        unit="만원"
      />
      <TextField
        label="월세"
        type="number"
        name="monthlyRent"
        onChange={handleChange}
        unit="만원"
      />
      <TextField
        label="관리비"
        type="number"
        name="adminCost"
        onChange={handleChange}
        unit="만원"
      />
    </div>
  );
}
