import { ChangeEventHandler } from 'react';

import styled from '@emotion/styled';

interface Props {
  options: string[] | number[];
  values: string[] | number[];
  defaultValue?: string | number;
  onChange: ChangeEventHandler;
}

const Select = styled.select`
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.4);
  border: 2px solid black;
  height: 48px;
  padding-left: 16px;
  border-radius: 100px;
  outline: none;
  -webkit-appearance: none;
  font-size: 0.9rem;
  background: url('images/ic_select.png') no-repeat center right 0.8rem/0.9rem;
  width: 100%;
`;

const SelectBox = ({ options, values, defaultValue, onChange }: Props) => {
  return (
    <Select defaultValue={defaultValue} onChange={onChange}>
      {options.map((option, i) => (
        <option key={i} value={values[i]}>
          {option}
        </option>
      ))}
    </Select>
  );
};

export default SelectBox;
