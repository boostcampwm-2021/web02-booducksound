import { useState, MouseEventHandler, ChangeEventHandler, SetStateAction, Dispatch } from 'react';

import styled from '@emotion/styled';
import Router from 'next/router';
import { useDispatch } from 'react-redux';
import { Socket } from 'socket.io-client';

import InputText from '~/atoms/InputText';
import TextLabel from '~/atoms/TextLabel';
import useSocket from '~/hooks/useSocket';
import InputWithButton from '~/molecules/InputWithButton';
import Modal from '~/molecules/Modal';
import SelectSection from '~/molecules/SelectSection';
import SelectPlaylistModal from '~/organisms/SelectPlaylistModal';
import theme from '~/styles/theme';
import { RoomActions } from '~/types/Actions';
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

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 8px;
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

const ModalInputText = styled(InputText)`
  padding: 10px 10px 10px 30px;
`;

interface Props {
  setModalOnOff: Dispatch<SetStateAction<boolean>>;
  leftButtonText: string;
}

interface Form {
  title: string;
  playlistName: string;
  playlistId: string;
  password: string;
  skip: number;
  timePerProblem: number;
}

const CreateRoomModal = ({ setModalOnOff, leftButtonText }: Props) => {
  const socket = useSocket();
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    title: '',
    playlistName: '',
    playlistId: '',
    password: '',
    skip: 5,
    timePerProblem: 60,
  });

  const [leftButtonDisabled, setLeftButtonDisabled] = useState(true);
  const [playlistModalOnOff, setPlaylistModalOnOff] = useState(false);

  const handleCreateRoomBtn: MouseEventHandler = () => {
    if (socket === null) return;
    if (!validateForm) return;

    (socket as Socket).emit(SocketEvents.CREATE_ROOM, form, (uuid: string) => {
      dispatch({ type: RoomActions.SET_UUID, payload: { uuid } });
      Router.push(`/game`);
    });
  };

  const validateForm = (form: Form) => {
    const condition = !form.title || !form.playlistId;
    setLeftButtonDisabled(condition);
    return !condition;
  };

  return (
    <Modal
      height="480px"
      maxWidth="540px"
      leftButtonText={leftButtonText}
      leftButtonHandler={handleCreateRoomBtn}
      rightButtonHandler={() => setModalOnOff(false)}
      leftButtonDisabled={leftButtonDisabled}
    >
      <Container>
        <ContentContainer>
          <TextLabel>방 제목</TextLabel>
          <ModalInputText
            className="roomTitle"
            placeholder="방 제목을 입력하세요"
            isSearch={false}
            value={form.title}
            handleChange={(e) => {
              setForm((prev) => {
                const form = { ...prev, title: (e.target as HTMLInputElement).value };
                validateForm(form);
                return form;
              });
            }}
          />
        </ContentContainer>
        <ContentContainer>
          <SelectPlaylistLabel>플레이리스트</SelectPlaylistLabel>
          <InputWithButton
            inputClassName="selectPlaylist"
            placeholder="플레이리스트를 선택해주세요"
            isSearch={false}
            btnWidth="100px"
            btnFontSize="0.8em"
            btnContent="고르기"
            btnBackground={theme.colors.lime}
            btnSmWidth="60px"
            btnHeight="38px"
            disabled={true}
            value={form.playlistName}
            onClick={() => setPlaylistModalOnOff(true)}
          />
          {playlistModalOnOff && (
            <SelectPlaylistModal setModalOnOff={setPlaylistModalOnOff} setForm={setForm} validateForm={validateForm} />
          )}
        </ContentContainer>
        <ContentContainer>
          <TextLabel>비밀번호</TextLabel>
          <ModalInputText
            className="roomPassword"
            placeholder=""
            isSearch={false}
            value={form.password}
            handleChange={(e) => {
              setForm((form) => ({ ...form, password: (e.target as HTMLInputElement).value }));
            }}
          />
        </ContentContainer>
        <HalfContainer>
          <SelectSection
            title="스킵 인원 수"
            margin="8px"
            titleSize="1em"
            options={['1명', '2명', '3명', '4명', '5명', '6명', '7명', '8명']}
            defaultValue="5명"
            onChange={(e) => {
              const skipStr = (e.target as HTMLSelectElement).value;
              const skip = Number(skipStr.replace(/[^0-9]/g, ''));
              setForm((form) => ({ ...form, skip }));
            }}
          />
          <SelectSection
            title="문항 당 시간"
            margin="8px"
            titleSize="1em"
            options={['10초', '20초', '30초', '40초', '50초', '60초', '70초', '80초', '90초']}
            defaultValue="60초"
            onChange={(e) => {
              const timePerProblemStr = (e.target as HTMLSelectElement).value;
              const timePerProblem = Number(timePerProblemStr.replace(/[^0-9]/g, ''));
              setForm((form) => ({ ...form, timePerProblem }));
            }}
          />
        </HalfContainer>
      </Container>
    </Modal>
  );
};

export default CreateRoomModal;
