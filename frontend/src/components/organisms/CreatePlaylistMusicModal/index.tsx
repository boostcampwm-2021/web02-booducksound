import { PropsWithChildren, useCallback, useState } from 'react';

import styled from '@emotion/styled';

import theme from '../../../styles/theme';
import { Music } from '../../../types/music';
import useEventListener from '../../../utils/useEventListener';
import Button from '../../atoms/Button';
import InputBox from '../../atoms/InputBox';
import Chip from '../../molecules/Chip';
import Modal from '../../molecules/Modal';

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
const MusicModalTitle = styled.div`
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

const CreatePlaylistMusicModal = ({ setMusics, setIsOpenModal }: PropsWithChildren<Props>) => {
  const [info, setInfo] = useState<string>('');
  const [hint, setHint] = useState<string>('');
  const [url, setUrl] = useState<string>('');
  const [answer, setAnswer] = useState<string>();
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
    (e: globalThis.KeyboardEvent) => {
      if (e.key !== 'Enter') return;
      if (!answer) return;
      setAnswer('');
      setAnswers((preState) => [...preState, answer]);
    },
    [answer],
  );

  useEventListener('keyup', pressEnterHandler);

  return (
    <Modal
      height={'500px'}
      maxWidth={'700px'}
      leftButtonText={'등록'}
      rightButtonText={'취소'}
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
        <InputBox
          fontSize={'15px'}
          height={'50px'}
          isSearch={false}
          placeholder={'노래 정보를 입력해 주세요. ex) 아이유 - 팔레트'}
          width={'98%'}
          value={info}
          onChangeHandler={(e) => setInfo((e.currentTarget as HTMLTextAreaElement).value)}
        ></InputBox>
        <InputBox
          fontSize={'15px'}
          height={'50px'}
          isSearch={false}
          placeholder={'힌트를 입력해 주세요.'}
          width={'98%'}
          value={hint}
          onChangeHandler={(e) => setHint((e.currentTarget as HTMLTextAreaElement).value)}
        ></InputBox>
        <InputBox
          fontSize={'15px'}
          height={'50px'}
          isSearch={false}
          placeholder={'유튜브 URL을 입력해 주세요.'}
          width={'98%'}
          value={url}
          onChangeHandler={(e) => setUrl((e.currentTarget as HTMLTextAreaElement).value)}
        ></InputBox>
        <InputBox
          fontSize={'15px'}
          height={'50px'}
          isSearch={false}
          placeholder={'정답을 입력 후 Enter를 클릭해 주세요.'}
          width={'98%'}
          value={answer}
          onChangeHandler={(e) => setAnswer((e.currentTarget as HTMLTextAreaElement).value)}
        ></InputBox>
      </MusicModalInputBox>
      <MusicModalChipContainer>
        {answers.map((answer, idx) => (
          <Chip content={answer} key={idx} />
        ))}
      </MusicModalChipContainer>
    </Modal>
  );
};

export default CreatePlaylistMusicModal;
