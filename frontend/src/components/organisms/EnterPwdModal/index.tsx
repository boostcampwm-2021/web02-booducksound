import { useState, ChangeEventHandler, SetStateAction, Dispatch } from 'react';

import styled from '@emotion/styled';
import Router from 'next/router';
import { useDispatch } from 'react-redux';

import InputText from '~/atoms/InputText';
import TextLabel from '~/atoms/TextLabel';
import useSocket from '~/hooks/useSocket';
import Modal from '~/molecules/Modal';
import { RoomActions } from '~/types/Actions';
import { SocketEvents } from '~/types/SocketEvents';

interface Props {
  setModalOnOff: Dispatch<SetStateAction<string>>;
  leftButtonText?: string;
  uuid: string;
}

const ModalInputText = styled(InputText)`
  font-size: 1rem;
  padding: 14px 10px 14px 24px;
  display: block;
  margin: 15px 0 0 0;
  width: calc(100% - 0.4rem);
`;

const EnterPwdModal = ({ uuid, setModalOnOff, leftButtonText }: Props) => {
  const [code, setCode] = useState('');
  const dispatch = useDispatch();
  const socket = useSocket();
  const handleEnterRoom = () => {
    if (!code) return alert('비밀번호를 입력해 주세요.');
    socket?.emit(SocketEvents.COMPARE_PWD, uuid, code, (res: boolean) => {
      if (!res) return alert('비밀번호가 다릅니다.');
      dispatch({ type: RoomActions.SET_UUID, payload: { uuid: uuid } });
      Router.push(`/game`);
    });
  };

  const handleSetCode: Function = ({ target }: Event) => {
    setCode((target as HTMLInputElement).value);
  };

  return (
    <Modal
      height="180px"
      maxWidth="540px"
      leftButtonHandler={handleEnterRoom}
      rightButtonHandler={() => setModalOnOff('')}
      leftButtonText={leftButtonText}
    >
      <TextLabel>비밀번호</TextLabel>
      <ModalInputText
        className="roomTitle"
        placeholder="비밀번호를 입력하세요."
        isSearch={false}
        handleChange={handleSetCode as ChangeEventHandler}
        value={code}
      />
    </Modal>
  );
};

export default EnterPwdModal;
