import styled from '@emotion/styled';

interface Props {
  options: string[] | number[];
  defaultValue?: string | number;
}

const Select = styled.select`
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.4);
  border: 2px solid black;
  padding: 0.8rem 6rem 0.8rem 1.2rem;
  border-radius: 100px;
  outline: none;
  -webkit-appearance: none;
  font-size: 0.9rem;
  background: url('images/ic_select.png') no-repeat center right 0.8rem/0.9rem;
  width: 100%;
`;

const SelectBox = ({ options, defaultValue }: Props) => {
  return (
    <Select defaultValue={defaultValue}>
      {options.map((e, i) => (
        <option key={`${e}${i}`}>{e}</option>
      ))}
    </Select>
  );
};

export default SelectBox;
