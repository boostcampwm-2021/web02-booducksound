import { ChangeEventHandler, KeyboardEventHandler, MouseEventHandler } from 'react';

import styled from '@emotion/styled';

import InputText from '~/atoms/InputText';
import ResponsiveButton from '~/molecules/ResponsiveButton';

type Props = {
  inputClassName: string;
  disabled: boolean;
  isSearch: boolean;
  placeholder: string;
  value: string;
  handleEnter?: KeyboardEventHandler;
  handleChange?: ChangeEventHandler;

  btnWidth: string;
  btnHeight: string;
  btnFontSize: string;
  btnContent: string;
  btnBackground: string;
  btnLgWidth?: string;
  btnMdWidth?: string;
  btnSmWidth?: string;
  onClick?: MouseEventHandler;
};

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

const ButtonWithInputText = styled(InputText)`
  padding: 10px 10px 10px 30px;
  width: 100%;
`;

const InputWithButton = (props: Props) => {
  return (
    <Container>
      <ButtonWithInputText
        className={props.inputClassName}
        isSearch={props.isSearch}
        placeholder={props.placeholder}
        disabled={props.disabled}
        value={props.value}
      />
      <ButtonContainer>
        <ResponsiveButton
          width={props.btnWidth}
          fontSize={props.btnFontSize}
          background={props.btnBackground}
          lgWidth={props.btnLgWidth}
          mdWidth={props.btnMdWidth}
          smWidth={props.btnSmWidth}
          height={props.btnHeight}
          onClick={props.onClick}
        >
          {props.btnContent}
        </ResponsiveButton>
      </ButtonContainer>
    </Container>
  );
};

export default InputWithButton;
