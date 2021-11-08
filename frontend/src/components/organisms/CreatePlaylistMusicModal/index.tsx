import { PropsWithChildren, useCallback, useState } from 'react';

import Button from '@atoms/Button';
import InputText from '@atoms/InputText';
import styled from '@emotion/styled';
import Chip from '@molecules/Chip';
import Modal from '@molecules/Modal';
import theme from '@styles/theme';
import { Music } from '@type/music';

interface Props {
  setMusics: Function;
  setIsOpenModal: Function;
}

const MusicModalTop = styled.div`
  display: flex;
  column-gap: 15px;
  align-items: center;
  margin-bottom: 20px;
`;
const MusicModalTitle = styled.h1`
  font-size: 25px;
  font-weight: bold;
`;
const MusicModalDescription = styled.div`
  color: #999999;
  font-size: 15px;
`;
const MusicModalInputBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 10px;
  margin-bottom: 20px;
`;
const MusicModalChipContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  column-gap: 10px;
  row-gap: 10px;
  margin-bottom: 40px;
`;
const MusicModalInputText = styled(InputText)`
  width: 98%;
  padding: 12px 10px 12px 45px;
`;

const CreatePlaylistMusicModal = ({ setMusics, setIsOpenModal }: PropsWithChildren<Props>) => {
  const [info, setInfo] = useState<string>('');
  const [hint, setHint] = useState<string>('');
  const [url, setUrl] = useState<string>('');
  const [answer, setAnswer] = useState<string>('');
  const [answers, setAnswers] = useState<string[]>([]);

  const leftButtonHandler = useCallback(
    (e) => {
      if (!(info && hint && url && answers.length !== 0)) {
        alert('노래 정보를 모두 입력해야합니다.');
        return;
      }
      setMusics((preState: Music[]) => [
        ...preState,
        {
          info,
          hint,
          url,
          answers,
        },
      ]);
      setIsOpenModal(false);
    },
    [answers, hint, info, setIsOpenModal, setMusics, url],
  );
  const rightButtonHandler = useCallback(
    (e) => {
      setIsOpenModal(false);
    },
    [setIsOpenModal],
  );

  const pressEnterHandler = useCallback(
    (e) => {
      if (e.key !== 'Enter') return;
      if (!answer) return;
      setAnswer('');
      setAnswers((preState) => [...preState, answer]);
    },
    [answer],
  );

  return (
    <Modal
      height="500px"
      maxWidth="700px"
      leftButtonText="등록"
      rightButtonText="취소"
      leftButtonHanlder={leftButtonHandler}
      rightButtonHanlder={rightButtonHandler}
    >
      <MusicModalTop>
        <MusicModalTitle>노래 추가</MusicModalTitle>
        <MusicModalDescription>(최소 3개, 최대 50개)</MusicModalDescription>
        <Button
          content={'초기화'}
          background={theme.colors.sky}
          height={'40px'}
          width={'150px'}
          paddingH={'10px'}
        ></Button>
      </MusicModalTop>
      <MusicModalInputBox>
        <MusicModalInputText
          handleChange={(e) => setInfo((e.currentTarget as HTMLTextAreaElement).value)}
          className="info"
          isSearch={false}
          placeholder="노래 정보를 입력해 주세요. ex) 아이유 - 팔레트"
          value={info}
        ></MusicModalInputText>
        <MusicModalInputText
          handleChange={(e) => setHint((e.currentTarget as HTMLTextAreaElement).value)}
          className="hint"
          isSearch={false}
          placeholder="힌트를 입력해 주세요."
          value={hint}
        ></MusicModalInputText>
        <MusicModalInputText
          handleChange={(e) => setUrl((e.currentTarget as HTMLTextAreaElement).value)}
          className="url"
          isSearch={false}
          placeholder="유튜브 URL을 입력해 주세요."
          value={url}
        ></MusicModalInputText>
        <MusicModalInputText
          handleChange={(e) => setAnswer((e.currentTarget as HTMLTextAreaElement).value)}
          handleEnter={pressEnterHandler}
          className="answer"
          isSearch={false}
          placeholder="정답을 입력 후 Enter를 클릭해 주세요."
          value={answer}
        ></MusicModalInputText>
      </MusicModalInputBox>
      <MusicModalChipContainer>
        {answers.map((answer, idx) => (
          <Chip key={idx} deleteHandler={(e) => setAnswers((preState) => [...preState.filter((chip, i) => i !== idx)])}>
            {answer}
          </Chip>
        ))}
      </MusicModalChipContainer>
    </Modal>
  );
};

export default CreatePlaylistMusicModal;
