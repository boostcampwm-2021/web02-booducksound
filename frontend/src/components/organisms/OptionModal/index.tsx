import { useState, MouseEventHandler, SetStateAction, Dispatch, ChangeEvent } from 'react';

import styled from '@emotion/styled';
import { useSelector } from 'react-redux';
import { Socket } from 'socket.io-client';

import InputText from '~/atoms/InputText';
import TextLabel from '~/atoms/TextLabel';
import { ROOM_TITLE_EMPTY_MSG } from '~/constants/index';
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

const InputContainer = styled.div`
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

type Props = {
  setModalOnOff: Dispatch<SetStateAction<boolean>>;
  leftButtonText: string;
  gameRoom: GameRoom;
  initPassword: string;
};

type Form = {
  [key: string]: string | number;
  title: string;
  playlistName: string;
  playlistId: string;
  password: string;
  needAnswerRatio: number;
  timePerProblem: number;
};

type SelectOption = {
  needAnswerRatio?: number;
  timePerProblem?: number;
};

const OptionModal = ({ setModalOnOff, leftButtonText, gameRoom, initPassword }: Props) => {
  const socket = useSocket();
  const { uuid } = useSelector((state: RootState) => state.room);
  const { title, playlistName, playlistId, needAnswerRatio, timePerProblem } = gameRoom;
  const defaultForm = {
    title,
    playlistName,
    playlistId,
    needAnswerRatio,
    timePerProblem,
    password: initPassword,
  };
  const [leftButtonDisabled, setLeftButtonDisabled] = useState(true);
  const [playlistModalOnOff, setPlaylistModalOnOff] = useState(false);
  const [form, setForm] = useState<Form>(defaultForm);

  const handleUpdateRoomBtn: MouseEventHandler = () => {
    if (!socket) return;
    if (!validateForm) return;

    (socket as Socket).emit(SocketEvents.CHNAGE_GAME_OPTION, uuid, form, () => {
      setModalOnOff(false);
    });
  };

  const checkFormChanged = (prev: Form, next: Form) => {
    return Object.keys(prev).some((key) => prev[key] !== next[key]);
  };

  const validateForm = (form: Form) => {
    const condition = !checkFormChanged(defaultForm, form) || !form.title || !form.playlistId;
    setLeftButtonDisabled(condition);
    return !condition;
  };

  const handleSelect = (option: SelectOption) =>
    setForm((prev: Form) => {
      const form = { ...prev, ...option };
      validateForm(form);
      return form;
    });

  return (
    <Modal
      height="480px"
      maxWidth="540px"
      leftButtonText={leftButtonText}
      leftButtonHandler={handleUpdateRoomBtn}
      rightButtonHandler={() => setModalOnOff(false)}
      leftButtonDisabled={leftButtonDisabled}
    >
      <Container>
        <InputContainer>
          <TextLabel>방 제목</TextLabel>
          <ModalInputText
            className="roomTitle"
            placeholder={ROOM_TITLE_EMPTY_MSG}
            isSearch={false}
            value={form.title}
            handleChange={(e: ChangeEvent) => {
              setForm((prev) => {
                const form = { ...prev, title: (e.target as HTMLInputElement).value };
                validateForm(form);
                return form;
              });
            }}
          />
        </InputContainer>
        <InputContainer>
          <SelectPlaylistLabel>플레이리스트</SelectPlaylistLabel>
          <InputWithButton
            inputClassName="selectPlaylist"
            placeholder={form.playlistName}
            isSearch={false}
            btnWidth="84px"
            btnFontSize="0.8em"
            btnContent="고르기"
            btnBackground={theme.colors.lime}
            btnSmWidth="72px"
            btnHeight="36px"
            disabled={true}
            value={form.playlistName}
            onClick={() => setPlaylistModalOnOff(true)}
          />
          {playlistModalOnOff && (
            <SelectPlaylistModal setModalOnOff={setPlaylistModalOnOff} setForm={setForm} validateForm={validateForm} />
          )}
        </InputContainer>
        <InputContainer>
          <TextLabel>비밀번호</TextLabel>
          <ModalInputText
            className="roomPassword"
            placeholder={gameRoom.hasPassword ? '********' : ''}
            isSearch={false}
            value={form.password}
            handleChange={(e: ChangeEvent) => {
              setForm((prev) => {
                const form = { ...prev, password: (e.target as HTMLInputElement).value };
                validateForm(form);
                return form;
              });
            }}
          />
        </InputContainer>
        <HalfContainer>
          <SelectSection
            title="정답 인원 수"
            margin="8px"
            titleSize="1em"
            options={['1명만', '25% 이상', '50% 이상', '75% 이상', '모두']}
            values={[0.01, 0.25, 0.5, 0.75, 1]}
            defaultValue={form.needAnswerRatio}
            onChange={(e: ChangeEvent) =>
              handleSelect({ needAnswerRatio: Number((e.target as HTMLSelectElement).value) })
            }
          />
          <SelectSection
            title="문항 당 시간"
            margin="8px"
            titleSize="1em"
            options={['10초', '20초', '30초', '40초', '50초', '60초', '70초', '80초', '90초']}
            values={[10, 20, 30, 40, 50, 60, 70, 80, 90]}
            defaultValue={form.timePerProblem}
            onChange={(e: ChangeEvent) =>
              handleSelect({ timePerProblem: Number((e.target as HTMLSelectElement).value) })
            }
          />
        </HalfContainer>
      </Container>
    </Modal>
  );
};

export default OptionModal;
