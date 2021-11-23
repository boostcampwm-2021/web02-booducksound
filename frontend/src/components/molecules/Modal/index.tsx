import { MouseEventHandler, PropsWithChildren } from 'react';

import styled from '@emotion/styled';

import Portal from '~/atoms/Portal';
import ResponsiveButton from '~/molecules/ResponsiveButton';
import theme from '~/styles/theme';

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
  max-height: 90vh;
  padding: 32px;
  background: #fff;
  border-radius: 32px;
  z-index: 99;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 32px 16px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 32px 10px;
  }
`;

const ModalWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const ButtonContainer = styled.div<{ hasOnlyCancleBtn: boolean }>`
  position: absolute;
  left: 50%;
  bottom: -24px;
  transform: translateX(-50%);
  width: 80%;
  display: flex;
  justify-content: ${({ hasOnlyCancleBtn }) => (hasOnlyCancleBtn ? 'flex-end' : 'space-between')};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    bottom: -16px;
  }
`;

interface Props extends ModalContainerProps {
  leftButtonText?: string;
  rightButtonText?: string;
  leftButtonHandler?: MouseEventHandler;
  rightButtonHandler?: MouseEventHandler;
  hasModalBackground?: boolean;
  hasOnlyCancleBtn?: boolean;
  leftButtonDisabled?: boolean;
}

const Modal = ({
  children,
  height,
  maxWidth,
  leftButtonText,
  rightButtonText,
  leftButtonHandler,
  rightButtonHandler,
  hasModalBackground = true,
  hasOnlyCancleBtn = false,
  leftButtonDisabled,
}: PropsWithChildren<Props>) => {
  return (
    <Portal>
      {hasModalBackground && <ModalBackground />}
      <ModalContainer height={height} maxWidth={maxWidth}>
        <ModalWrapper>
          {children}
          <ButtonContainer hasOnlyCancleBtn={hasOnlyCancleBtn}>
            {!hasOnlyCancleBtn && (
              <ResponsiveButton
                width={'180px'}
                fontSize={'22px'}
                mdWidth={'160px'}
                mdFontSize={'20px'}
                smWidth={'120px'}
                smFontSize={'16px'}
                background={theme.colors.sky}
                onClick={leftButtonHandler}
                disabled={leftButtonDisabled}
              >
                {leftButtonText || '확인'}
              </ResponsiveButton>
            )}
            <ResponsiveButton
              width={'180px'}
              fontSize={'22px'}
              mdWidth={'160px'}
              mdFontSize={'20px'}
              smWidth={'120px'}
              smFontSize={'16px'}
              background={theme.colors.alert}
              onClick={rightButtonHandler}
            >
              {rightButtonText || '취소'}
            </ResponsiveButton>
          </ButtonContainer>
        </ModalWrapper>
      </ModalContainer>
    </Portal>
  );
};

export default Modal;
