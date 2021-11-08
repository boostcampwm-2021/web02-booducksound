import { MouseEventHandler } from 'react';

import styled from '@emotion/styled';

import InputBox from '~/atoms/InputBox';
import ResponsiveButton from '~/molecules/ResponsiveButton';

interface Props {
  isSearch: boolean;
  placeholder: string;
  inputWidth: string;
  inputHeight: string;
  inputFontSize: string;
  inputPaddingW?: string;
  inputDisabled?: boolean;

  btnWidth: string;
  btnHeight: string;
  btnFontSize: string;
  btnContent: string;
  btnBackground: string;
  btnLgWidth?: string;
  btnMdWidth?: string;
  btnSmWidth?: string;
  onClick?: MouseEventHandler;
}

const Container = styled.div`
  position: relative;
`;

const ButtonContainer = styled.div`
  position: absolute;
  width: fit-content;
  right: 0;
  bottom: 50%;
  transform: translate(-10%, 50%);
`;

const InputWithButton = (props: Props) => {
  return (
    <Container>
      <InputBox
        width={props.inputWidth}
        height={props.inputHeight}
        fontSize={props.inputFontSize}
        isSearch={props.isSearch}
        placeholder={props.placeholder}
        paddingW={props.inputPaddingW}
        disabled={props.inputDisabled}
      />
      <ButtonContainer>
        <ResponsiveButton
          width={props.btnWidth}
          fontSize={props.btnFontSize}
          content={props.btnContent}
          background={props.btnBackground}
          lgWidth={props.btnLgWidth}
          mdWidth={props.btnMdWidth}
          smWidth={props.btnSmWidth}
          height={props.btnHeight}
          onClick={props.onClick}
        />
      </ButtonContainer>
    </Container>
  );
};

export default InputWithButton;
