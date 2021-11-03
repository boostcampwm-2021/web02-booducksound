import { MouseEventHandler } from 'react';

import styled from '@emotion/styled';

import theme from '../../../styles/theme';
import InputSection from '../../molecules/InputSection';
import InputWithButton from '../../molecules/InputWithButton';
import Modal from '../../molecules/Modal';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
  width: 100%;
  padding: 8px 0;
  margin: 0 auto;
  row-gap: 36px;
  font-size: 22px;
  overflow-y: scroll;
  padding: 8px;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 18px;
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

interface Props {
  handleCreateRoomYesBtn: MouseEventHandler;
  handleCreateRoomNoBtn: MouseEventHandler;
}

const CreateRoomModal = ({ handleCreateRoomYesBtn, handleCreateRoomNoBtn }: Props) => {
  const handleSelectPlaylistBtn = () => {};

  return (
    <Modal
      height="440px"
      maxWidth="480px"
      leftButtonText="생성"
      leftButtonHanlder={handleCreateRoomYesBtn}
      rightButtonHanlder={handleCreateRoomNoBtn}
    >
      <Container>
        <InputSection
          id="roomTitle"
          title="방 제목 *"
          fontSize="0.76em"
          height="48px"
          placeholder="방 제목을 입력하세요"
          titleSize="1em"
          width="100%"
          margin="8px"
          isSearch={false}
          paddingW="20px"
        />
        <InputSection
          id="roomPassword"
          title="비밀번호"
          fontSize="0.76em"
          height="48px"
          placeholder=""
          titleSize="1em"
          width="100%"
          margin="8px"
          isSearch={false}
          paddingW="20px"
        />
        <SelectPlaylistContainer>
          <SelectPlaylistLabel>플레이리스트 *</SelectPlaylistLabel>
          <InputWithButton
            inputFontSize="0.76em"
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
            onClick={handleSelectPlaylistBtn}
          ></InputWithButton>
        </SelectPlaylistContainer>
      </Container>
    </Modal>
  );
};

export default CreateRoomModal;
