import { useState, MouseEventHandler, ChangeEventHandler, SetStateAction, Dispatch, useEffect } from 'react';

import styled from '@emotion/styled';
import { useSelector } from 'react-redux';
import { Socket } from 'socket.io-client';

import InputText from '~/atoms/InputText';
import TextLabel from '~/atoms/TextLabel';
import useSocket from '~/hooks/useSocket';
import InputWithButton from '~/molecules/InputWithButton';
import Modal from '~/molecules/Modal';
import SelectSection from '~/molecules/SelectSection';
import SelectPlaylistModal from '~/organisms/SelectPlaylistModal';
import { RootState } from '~/reducers/index';
import theme from '~/styles/theme';
import { GameRoom } from '~/types/GameRoom';
import { SocketEvents } from '~/types/SocketEvents';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
  width: 100%;
  padding: 8px 0;
  margin: 0 auto;
  row-gap: 24px;
  font-size: 16px;
  overflow-y: scroll;
  padding: 8px;

  input:disabled {
    background: inherit;
    color: inherit;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 16px;
  }
`;

const SelectPlaylistContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 8px;
`;

const ModalInputText = styled(InputText)`
  padding: 10px 10px 10px 30px;
`;

const SelectPlaylistLabel = styled.h4`
  font-size: 1em;
  font-weight: 700;
`;

const HalfContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 12px;
`;

interface Props {
  setModalOnOff: Dispatch<SetStateAction<boolean>>;
  leftButtonText: string;
  gameRoom: GameRoom;
}

interface Form {
  [index: string]: string | number;
  title: string;
  playlistName: string;
  playlistId: string;
  password: string;
  skip: GameRoom['skip'] | number;
  timePerProblem: GameRoom['timePerProblem'] | number;
}

const OptionModal = ({ setModalOnOff, leftButtonText, gameRoom }: Props) => {
  const socket = useSocket();
  const { uuid } = useSelector((state: RootState) => state.room);
  const [password, setPassword] = useState('');
  const { title, playlistName, playlistId, skip, timePerProblem } = gameRoom;
  const defaultValue = { title, playlistName, playlistId, skip, timePerProblem, password };
  const [form, setForm] = useState<Form>({ title, playlistName, playlistId, skip, timePerProblem, password });
  const [leftButtonDisabled, setLeftButtonDisabled] = useState(true);
  const [playlistModalOnOff, setPlaylistModalOnOff] = useState(false);

  const handleTitleChange: ChangeEventHandler = (e) => {
    const title = (e.target as HTMLInputElement).value;
    console.log(title);
    setForm((prev) => {
      const form = { ...prev, title };
      validateForm(form, password);
      return form;
    });
  };

  const handleSelectPlaylistBtn: MouseEventHandler = () => {
    setPlaylistModalOnOff(true);
  };

  const handlePasswordChange: ChangeEventHandler = (e) => {
    const password = (e.target as HTMLInputElement).value;
    setPassword(password);
    validateForm(form, password);
  };

  const handleSkipChange: ChangeEventHandler = (e) => {
    const skipStr = (e.target as HTMLSelectElement).value;
    const skip = Number(skipStr.replace(/[^0-9]/g, ''));
    setForm((form) => ({ ...form, skip }));
  };

  const hanldeTimePerProlbemChange: ChangeEventHandler = (e) => {
    const timePerProblemStr = (e.target as HTMLSelectElement).value;
    const timePerProblem = Number(timePerProblemStr.replace(/[^0-9]/g, ''));
    setForm((form) => ({ ...form, timePerProblem }));
  };

  const handleUpdateRoomBtn: MouseEventHandler = () => {
    if (socket === null) return;
    if (!validateForm) return;

    (socket as Socket).emit(SocketEvents.SET_GAME_ROOM, uuid, password, form, () => {
      setModalOnOff(false);
    });
  };

  const handleNoBtn: MouseEventHandler = () => {
    setModalOnOff(false);
  };

  const compareForm = (prev: Form, next: Form) => {
    for (const key of Object.keys(prev)) {
      if (prev[key] !== next[key]) {
        return false;
      }
    }
    return true;
  };

  const validateForm = (form: Form, password: string) => {
    if (!compareForm(defaultValue, form) || password) {
      setLeftButtonDisabled(false);
      return true;
    }

    setLeftButtonDisabled(true);
    return false;
  };

  return (
    <Modal
      height="480px"
      maxWidth="540px"
      leftButtonText={leftButtonText}
      leftButtonHandler={handleUpdateRoomBtn}
      rightButtonHandler={handleNoBtn}
      leftButtonDisabled={leftButtonDisabled}
    >
      <Container>
        <TextLabel>방 제목</TextLabel>
        <ModalInputText
          className="roomTitle"
          placeholder="방 제목을 입력하세요"
          isSearch={false}
          value={form.title}
          handleChange={handleTitleChange}
        />
        <SelectPlaylistContainer>
          <SelectPlaylistLabel>플레이리스트</SelectPlaylistLabel>
          <InputWithButton
            inputClassName="selectPlaylist"
            placeholder={form.playlistName}
            isSearch={false}
            btnWidth="100px"
            btnFontSize="0.8em"
            btnContent="고르기"
            btnBackground={theme.colors.lime}
            btnSmWidth="60px"
            btnHeight="38px"
            disabled={true}
            value={form.playlistName}
            onClick={handleSelectPlaylistBtn}
          />
          {playlistModalOnOff && (
            <SelectPlaylistModal setModalOnOff={setPlaylistModalOnOff} setForm={setForm} validateForm={validateForm} />
          )}
        </SelectPlaylistContainer>
        <TextLabel>비밀번호</TextLabel>
        <ModalInputText
          className="roomPassword"
          placeholder={gameRoom.hasPassword ? '********' : ''}
          isSearch={false}
          value={password}
          handleChange={handlePasswordChange}
        />
        <HalfContainer>
          <SelectSection
            title="스킵 인원 수"
            margin="8px"
            titleSize="1em"
            options={['1명', '2명', '3명', '4명', '5명', '6명', '7명', '8명']}
            defaultValue="5명"
            onChange={handleSkipChange}
          />
          <SelectSection
            title="문항 당 시간"
            margin="8px"
            titleSize="1em"
            options={['10초', '20초', '30초', '40초', '50초', '60초', '70초', '80초', '90초']}
            defaultValue="60초"
            onChange={hanldeTimePerProlbemChange}
          />
        </HalfContainer>
      </Container>
    </Modal>
  );
};

export default OptionModal;
