import { PropsWithChildren } from 'react';

import styled from '@emotion/styled';

import theme from '../../../styles/theme';
import Portal from '../../atoms/Portal';
import ResponsiveButton from '../ResponsiveButton';

interface ModalContainerProps {
  height?: string;
  maxWidth?: string;
}

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.68);
  width: 100vw;
  height: 100vh;
`;

const ModalContainer = styled.div<ModalContainerProps>`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90vw;
  max-width: ${({ maxWidth }) => maxWidth || '640px'};
  height: ${({ height }) => height || '72vh'};
  padding: 32px;
  background: #fff;
  border-radius: 32px;
  z-index: 99;
`;

const ModalWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: scroll;
`;

const ButtonContainer = styled.div`
  position: absolute;
  left: 50%;
  bottom: -24px;
  transform: translateX(-50%);
  width: 80%;
  display: flex;
  justify-content: space-between;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    bottom: -16px;
  }
`;

interface Props extends ModalContainerProps {
  leftButtonText?: string;
  rightButtonText?: string;
}

const Modal = ({ children, height, maxWidth, leftButtonText, rightButtonText }: PropsWithChildren<Props>) => {
  return (
    <Portal>
      <ModalBackground />
      <ModalContainer height={height} maxWidth={maxWidth}>
        <ModalWrapper>
          {children}
          <ButtonContainer>
            <ResponsiveButton
              width={'180px'}
              fontSize={'22px'}
              mdWidth={'160px'}
              mdFontSize={'20px'}
              smWidth={'120px'}
              smFontSize={'16px'}
              background={theme.colors.sky}
              content={leftButtonText || '확인'}
            />
            <ResponsiveButton
              width={'180px'}
              fontSize={'22px'}
              mdWidth={'160px'}
              mdFontSize={'20px'}
              smWidth={'120px'}
              smFontSize={'16px'}
              background={theme.colors.alert}
              content={rightButtonText || '취소'}
            />
          </ButtonContainer>
        </ModalWrapper>
      </ModalContainer>
    </Portal>
  );
};

export default Modal;
