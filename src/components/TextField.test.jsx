import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import TextField from './TextField';

describe('TextField', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  const handleChange = jest.fn();

  function renderTextField() {
    return render(<TextField
      label={given.inputLabel}
      type={given.inputType}
      name={given.inputName}
      selectOptions={given.selectOptions}
      unit={given.inputUnit}
      onChange={handleChange}
    />);
  }

  beforeEach(() => {
    jest.resetAllMocks();
  });

  context('when formType is "input"', () => {
    given('inputLabel', () => '월세');
    given('inputType', () => 'text');
    given('inputName', () => 'monthlyRent');
    given('inputUnit', () => '만원');

    it('renders input text control', () => {
      const { getByLabelText, queryByText } = renderTextField();

      expect(getByLabelText('월세')).not.toBeNull();
      expect(queryByText('만원')).not.toBeNull();
    });

    it('calls onChange handler when input change', () => {
      const { getByLabelText } = renderTextField();

      fireEvent.change(getByLabelText('월세'), {
        target: {
          value: 1000,
        },
      });

      expect(handleChange).toBeCalled();
    });
  });

  context('when formType is "textarea"', () => {
    given('inputLabel', () => '주소');
    given('inputType', () => 'textarea');
    given('inputName', () => 'address');

    it('renders textarea control', () => {
      const { queryByLabelText } = renderTextField();

      expect(queryByLabelText('주소')).not.toBeNull();
    });

    it('calls onChange handler when textarea change', () => {
      const { getByLabelText } = renderTextField();

      fireEvent.change(getByLabelText('주소'), {
        target: {
          value: '서울시 강남구',
        },
      });

      expect(handleChange).toBeCalled();
    });
  });

  context('when formType is "select"', () => {
    given('inputLabel', () => '입주유형');
    given('inputType', () => 'select');
    given('inputName', () => 'moveInType');
    given('selectOptions', () => ['전세', '월세']);

    it('renders select control', () => {
      const { queryByText } = renderTextField();

      expect(queryByText('전세')).not.toBeNull();
      expect(queryByText('월세')).not.toBeNull();
    });

    it('calls onChange handler when select change', () => {
      const { getByLabelText } = renderTextField();

      fireEvent.change(getByLabelText('입주유형'), {
        target: {
          value: '월세',
        },
      });

      expect(handleChange).toBeCalled();
    });
  });
});
