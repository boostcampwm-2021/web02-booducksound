import styled from '@emotion/styled';

const Label = styled.label`
  font-size: 1em;
  font-weight: bold;
`;

const TextLabel = ({ children }: { children: string }) => {
  return <Label>{children}</Label>;
};

export default TextLabel;
