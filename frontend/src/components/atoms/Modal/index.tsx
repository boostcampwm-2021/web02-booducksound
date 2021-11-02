import { PropsWithChildren } from 'react';

import styled from '@emotion/styled';

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.68);
  width: 100vw;
  height: 100vh;
`;

const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 920px;
  width: 90vw;
  max-height: 640px;
  padding: 32px;
  overflow-y: scroll;
  background: #fff;
  border-radius: 32px;
  z-index: 99;
`;

const Modal = ({ children }: PropsWithChildren<{}>) => {
  return (
    <>
      <ModalBackground />
      <ModalContainer>{children}</ModalContainer>
    </>
  );
};

export default Modal;
