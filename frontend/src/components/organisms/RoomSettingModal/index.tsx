import { useState, MouseEventHandler, ChangeEventHandler } from 'react';

import styled from '@emotion/styled';

import useSocketOn from '../../../hooks/useSocketOn';
import theme from '../../../styles/theme';
import InputSection from '../../molecules/InputSection';
import InputWithButton from '../../molecules/InputWithButton';
import Modal from '../../molecules/Modal';
import SelectSection from '../../molecules/SelectSection';

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

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 16px;
  }
`;

const SelectPlaylistContainer = styled.div`
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

interface Props {
  handleCreateRoomYesBtn: MouseEventHandler;
  handleCreateRoomNoBtn: MouseEventHandler;
  leftButtonText: string;
}

const CreateRoomModal = ({ handleCreateRoomYesBtn, handleCreateRoomNoBtn, leftButtonText }: Props) => {
  const [title, setTitle] = useState<string>();
  const [playListId, setPlayListId] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [skip, setSkip] = useState<number>();
  const [timePerProblem, setTimePerProblem] = useState<number>();

  const handleTitleChange: ChangeEventHandler = (e) => {
    const title = (e.target as HTMLInputElement).value;
    setTitle(title);
  };

  const handleSelectPlaylistBtn = () => {};

  const handlePasswordChange: ChangeEventHandler = (e) => {
    const password = (e.target as HTMLInputElement).value;
    setPassword(password);
  };

  const handleSkipChange: ChangeEventHandler = (e) => {
    const skipStr = (e.target as HTMLSelectElement).value;
    const skipNum = Number(skipStr.replace(/[^0-9]/g, ''));
    setSkip(skipNum);
  };

  const hanldeTimePerProlbemChange: ChangeEventHandler = (e) => {
    const timePerProblemStr = (e.target as HTMLSelectElement).value;
    const timePerProblemNum = Number(timePerProblemStr.replace(/[^0-9]/g, ''));
    setTimePerProblem(timePerProblemNum);
  };

  return (
    <Modal
      height="480px"
      maxWidth="540px"
      leftButtonText={leftButtonText}
      leftButtonHanlder={handleCreateRoomYesBtn}
      rightButtonHanlder={handleCreateRoomNoBtn}
    >
      <Container>
        <InputSection
          id="roomTitle"
          title="방 제목"
          fontSize="0.92em"
          height="48px"
          placeholder="방 제목을 입력하세요"
          titleSize="1em"
          width="100%"
          margin="8px"
          isSearch={false}
          paddingW="20px"
          onChangeHandler={handleTitleChange}
        />
        <SelectPlaylistContainer>
          <SelectPlaylistLabel>플레이리스트</SelectPlaylistLabel>
          <InputWithButton
            inputFontSize="0.92em"
            inputHeight="48px"
            placeholder="플레이리스트를 선택해주세요"
            inputWidth="100%"
            isSearch={false}
            btnWidth="100px"
            btnFontSize="0.8em"
            btnContent="고르기"
            btnBackground={theme.colors.lime}
            btnSmWidth="60px"
            btnHeight="38px"
            inputPaddingW="20px"
            inputDisabled={true}
            onClick={handleSelectPlaylistBtn}
          ></InputWithButton>
        </SelectPlaylistContainer>
        <InputSection
          id="roomPassword"
          title="비밀번호"
          fontSize="0.92em"
          height="48px"
          placeholder=""
          titleSize="1em"
          width="100%"
          margin="8px"
          isSearch={false}
          paddingW="20px"
          onChangeHandler={handlePasswordChange}
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

export default CreateRoomModal;
