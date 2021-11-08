import { ChangeEvent, PropsWithChildren, useCallback, useState } from 'react';

import styled from '@emotion/styled';

import Button from '~/atoms/Button';
import InputText from '~/atoms/InputText';
import Chip from '~/molecules/Chip';
import Modal from '~/molecules/Modal';
import theme from '~/styles/theme';
import { Music } from '~/types/Music';
import { showAlert } from '~/utils/showAlert';

interface Props {
  setMusics: Function;
  setModalOption: Function;
  musicInfo?: Music | null;
}
interface InputType {
  inputType: 'info' | 'hint' | 'url' | 'answers';
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

const CreatePlaylistMusicModal = ({ setMusics, setModalOption, musicInfo }: PropsWithChildren<Props>) => {
  const [music, setMusic] = useState<Music>({
    info: musicInfo ? musicInfo.info : '',
    hint: musicInfo ? musicInfo.hint : '',
    url: musicInfo ? musicInfo.url : '',
    answers: musicInfo ? musicInfo.answers : [],
  });
  const [answer, setAnswer] = useState<string>('');

  const { info, hint, url, answers } = music;

  const handleRegistButton = useCallback(
    (e) => {
      if (!showAlert(!(info && hint && url && answers.length !== 0), '노래 정보를 모두 입력해야합니다.')) return;
      if (!showAlert(!checkValidUrl(url), '유튜브 URL을 확인해주세요.')) return;
      const newState = { info, hint, url, answers };
      setMusics(newState);
      setModalOption({ type: 'close', target: null });
    },
    [answers, hint, info, setModalOption, setMusics, url],
  );
  const handleCancelButton = useCallback(
    (e) => {
      setModalOption({ type: 'close', target: null });
    },
    [setModalOption],
  );
  const pressEnterHandler = useCallback(
    (e) => {
      if (e.key !== 'Enter') return;
      if (!answer) return;
      setAnswer('');
      setMusic((preState) => {
        return { ...preState, answers: [...preState.answers, answer] };
      });
    },
    [answer],
  );
  const checkValidUrl = (url: string) => {
    const youtubeRegExp = /https:\/\/www\.youtube\.com\/watch\?v=[a-zA-Z0-9_]*/g;
    return RegExp(youtubeRegExp).test(url);
  };
  const handleChange =
    ({ inputType }: InputType) =>
    (e: ChangeEvent) => {
      const value: string | [] = (e.currentTarget as HTMLTextAreaElement).value;
      const newState: { [key: string]: string | [] } = {};
      newState[inputType] = value;
      setMusic((preState) => {
        return { ...preState, ...newState };
      });
    };

  return (
    <Modal
      height="500px"
      maxWidth="700px"
      leftButtonText="등록"
      rightButtonText="취소"
      leftButtonHandler={handleRegistButton}
      rightButtonHandler={handleCancelButton}
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
          onClick={(e) => {
            setMusic({ info: '', hint: '', url: '', answers: [] });
            setAnswer('');
          }}
        ></Button>
      </MusicModalTop>
      <MusicModalInputBox>
        <MusicModalInputText
          handleChange={(e) => handleChange({ inputType: 'info' })(e)}
          className="info"
          isSearch={false}
          placeholder="노래 정보를 입력해 주세요. ex) 아이유 - 팔레트"
          value={info}
        ></MusicModalInputText>
        <MusicModalInputText
          handleChange={(e) => handleChange({ inputType: 'hint' })(e)}
          className="hint"
          isSearch={false}
          placeholder="힌트를 입력해 주세요."
          value={hint}
        ></MusicModalInputText>
        <MusicModalInputText
          handleChange={(e) => handleChange({ inputType: 'url' })(e)}
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
          <Chip
            key={idx}
            deleteHandler={(e) =>
              setMusic((preState) => {
                return { ...preState, answers: [...preState.answers.filter((answer, i) => i !== idx)] };
              })
            }
          >
            {answer}
          </Chip>
        ))}
      </MusicModalChipContainer>
    </Modal>
  );
};

export default CreatePlaylistMusicModal;
