import styled from '@emotion/styled';

import SelectBox from '../../atoms/SelectBox';

interface InputLabelContainerProps {
  titleSize: string;
  margin: string;
}

interface Props extends InputLabelContainerProps {
  title: string;
  options: string[] | number[];
  defaultValue: string | number;
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

const SelectSection = ({ titleSize, margin, title, options, defaultValue }: Props) => {
  return (
    <InputSectionContainer>
      <InputLabelContainer titleSize={titleSize} margin={margin}>
        {title}
      </InputLabelContainer>
      <SelectBox options={options} defaultValue={defaultValue} />
    </InputSectionContainer>
  );
};

export default SelectSection;