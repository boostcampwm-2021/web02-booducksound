import { ChangeEventHandler } from 'react';

import styled from '@emotion/styled';

import SelectBox from '~/atoms/SelectBox';

type InputLabelContainerProps = {
  titleSize: string;
  margin: string;
};

interface Props extends InputLabelContainerProps {
  title: string;
  options: string[] | number[];
  values: string[] | number[];
  defaultValue: string | number;
  onChange: ChangeEventHandler;
}

const InputSectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const InputLabelContainer = styled.label<InputLabelContainerProps>`
  font-size: ${({ titleSize }) => titleSize};
  margin-bottom: ${({ margin }) => margin};
  font-weight: 700;
`;

const SelectSection = ({ titleSize, margin, title, options, values, defaultValue, onChange }: Props) => {
  return (
    <InputSectionContainer>
      <InputLabelContainer titleSize={titleSize} margin={margin}>
        {title}
      </InputLabelContainer>
      <SelectBox options={options} values={values} defaultValue={defaultValue} onChange={onChange} />
    </InputSectionContainer>
  );
};

export default SelectSection;
