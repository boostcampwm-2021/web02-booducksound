import styled from '@emotion/styled';

import theme from '~/styles/theme';

interface radio {
  name: string;
  value?: string;
  isChecked: boolean;
}

const RadioBtnGroup = styled.label`
  display: inline-flex;
  align-items: center;
  margin: 0.8rem;

  > * {
    cursor: pointer;
    user-select: none;
  }

  > span {
    margin-left: 0.2rem;
  }

  > input[type='radio'] {
    --focus: 2px rgba(39, 94, 254, 0.3);
    --border: #bbc1e1;
    -webkit-appearance: none;
    -moz-appearance: none;
    width: 36px;
    height: 36px;
    outline: none;
    display: inline-block;
    position: relative;
    margin: 0;
    border-radius: 50%;
    border: 1px solid ${theme.colors.gray};

    &:hover {
      border-color: ${theme.colors.deepgray};
    }

    &::after {
      content: '';
      position: absolute;
      width: 33px;
      height: 33px;
      border-radius: 50%;
      background: #fff;
      transform: scale(0.5);
    }
  }
`;

const Radio = ({ name, value, isChecked }: radio) => {
  return (
    <RadioBtnGroup>
      <input type="radio" name={name} checked={isChecked} />
      <span>{value}</span>
    </RadioBtnGroup>
  );
};

export default Radio;
