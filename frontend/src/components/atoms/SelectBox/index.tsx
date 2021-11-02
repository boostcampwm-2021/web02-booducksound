import styled from '@emotion/styled';

import select from '../../../types/select';

const Select = styled.select`
  box-shadow: 0px 4px 4px rgb(0 0 0 / 10%);
  padding: 0.8rem 6rem 0.8rem 1.2rem;
  border-radius: 20px;
  outline: none;
  -webkit-appearance: none;
  font-size: 0.9rem;
  background: url('images/ic_select.png') no-repeat center right 0.8rem/0.9rem;
`;

const SelectBox = ({ options }: select) => {
  return (
    <Select>
      {options.map((e: string, i: number) => (
        <option key={e + i}>{e}</option>
      ))}
    </Select>
  );
};

export default SelectBox;
