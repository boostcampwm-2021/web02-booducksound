import { useState, MouseEventHandler, ChangeEventHandler, SetStateAction, Dispatch } from 'react';

import styled from '@emotion/styled';

import InputText from '~/atoms/InputText';
import TextLabel from '~/atoms/TextLabel';
import Modal from '~/molecules/Modal';
import theme from '~/styles/theme';

interface Props {
  setModalOnOff: Dispatch<SetStateAction<boolean>>;
  leftButtonText?: string;
}

const ModalInputText = styled(InputText)`
  font-size: 1rem;
  padding: 14px 10px 14px 24px;
  display: block;
  margin: 15px 0 0 0;
  width: calc(100% - 0.4rem);
`;

const InviteCodeModal = ({ setModalOnOff, leftButtonText }: Props) => {
  const [code, setCode] = useState('');
  const handleEnterRoom = () => {
    if (!code) return alert('초대 코드를 입력해 주세요.');
    // setModalOnOff(false);
  };

  const handleSetCode: ChangeEventHandler = ({ target }: Event) => {
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
        handleChange={handleSetCode}
        value={code}
      />
    </Modal>
  );
};

export default InviteCodeModal;
