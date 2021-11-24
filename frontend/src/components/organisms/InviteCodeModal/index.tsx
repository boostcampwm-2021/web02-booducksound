import { useState, ChangeEventHandler, SetStateAction, Dispatch } from 'react';

import styled from '@emotion/styled';
import Router from 'next/router';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import InputText from '~/atoms/InputText';
import TextLabel from '~/atoms/TextLabel';
import { COPY_EMPTY_MSG, COPY_ERR_MSG, TOAST_OPTION } from '~/constants/index';
import Modal from '~/molecules/Modal';
import { RoomActions } from '~/types/Actions';

interface Props {
  setModalOnOff: Dispatch<SetStateAction<boolean>>;
  leftButtonText?: string;
  rooms: Array<String>;
}

const ModalInputText = styled(InputText)`
  font-size: 1rem;
  padding: 14px 10px 14px 24px;
  display: block;
  margin: 15px 0 0 0;
  width: calc(100% - 0.4rem);
`;

const findAvailableRoom = (roomID: string, rooms: Array<String>) => {
  const room = rooms.filter((e: String) => e === roomID);
  return room.length > 0;
};

const InviteCodeModal = ({ setModalOnOff, leftButtonText, rooms }: Props) => {
  const [code, setCode] = useState('');
  const dispatch = useDispatch();

  const handleEnterRoom = () => {
    if (!code) return toast.error(COPY_EMPTY_MSG, TOAST_OPTION);
    const res = findAvailableRoom(code, rooms);
    if (!res) return toast.error(COPY_ERR_MSG, TOAST_OPTION);
    dispatch({ type: RoomActions.SET_UUID, payload: { uuid: code } });
    Router.push(`/game`);
  };

  const handleSetCode: Function = ({ target }: Event) => {
    setCode((target as HTMLInputElement).value);
  };

  return (
    <Modal
      height="180px"
      maxWidth="540px"
      leftButtonHandler={handleEnterRoom}
      rightButtonHandler={() => setModalOnOff(false)}
      leftButtonText={leftButtonText}
    >
      <TextLabel>초대코드</TextLabel>
      <ModalInputText
        className="roomTitle"
        placeholder="초대 코드를 입력하세요."
        isSearch={false}
        handleChange={handleSetCode as ChangeEventHandler}
        value={code}
      />
    </Modal>
  );
};

export default InviteCodeModal;
