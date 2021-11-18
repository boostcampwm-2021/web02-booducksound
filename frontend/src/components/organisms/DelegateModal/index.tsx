import {  MouseEventHandler } from 'react';

import styled from '@emotion/styled';

import Modal from '~/molecules/Modal';

const AlertMsg = styled.p`
  text-align: center;
  font-size: 1.2rem;
  margin: 1.5rem 0;
`;

interface Props {
  nickname: string;
  leftButtonHandler: MouseEventHandler;
  rightButtonHandler: MouseEventHandler;
}

const DelegateModal = ({ nickname, leftButtonHandler, rightButtonHandler }: Props) => {
  return (
    <Modal
      leftButtonHandler={leftButtonHandler}
      rightButtonHandler={rightButtonHandler}
      leftButtonText="YES"
      height="150px"
    >
      <AlertMsg>{nickname} 님께 방장을 위임하시겠습니까?</AlertMsg>
    </Modal>
  );
};

export default DelegateModal;
