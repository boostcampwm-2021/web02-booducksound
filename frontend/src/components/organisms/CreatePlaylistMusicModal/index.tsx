import { ChangeEvent, KeyboardEventHandler, PropsWithChildren, useState } from 'react';

import styled from '@emotion/styled';

import Button from '~/atoms/Button';
import InputText from '~/atoms/InputText';
import {
  YOUTUBE_REG_EXP,
  MUSIC_INSERT_EXAMPLE_MSG,
  SHOW_HINT_MSG,
  URL_EMPTY_MSG,
  MUSIC_ANSWER_MSG,
  URL_CONFIRM_MSG,
  MUSIC_CONFIRM_MSG,
} from '~/constants/index';
import Chip from '~/molecules/Chip';
import Modal from '~/molecules/Modal';
import SearchUrlModal from '~/organisms/SearchUrlModal';
import theme from '~/styles/theme';
import { Music } from '~/types/Music';
import { showAlert } from '~/utils/showAlert';

type Props = {
  setMusics: Function;
  setModalOption: Function;
  musicInfo?: Music | null;
};

type InputType = {
  inputType: 'info' | 'hint' | 'url' | 'answers';
};

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
    info: musicInfo?.info || '',
    hint: musicInfo?.hint || '',
    url: musicInfo?.url || '',
    answers: musicInfo?.answers || [],
  });

  const [searchModalOnOff, setSearchModalOnOff] = useState<boolean>(false);
  const [answer, setAnswer] = useState<string>('');

  const handleRegistButton = () => {
    const { info, hint, url, answers } = music;

    const checkInfo = (info && hint && url && answers.length !== 0) as boolean;
    if (!showAlert(!checkInfo, MUSIC_CONFIRM_MSG)) return;
    if (!showAlert(!checkValidUrl(url), URL_CONFIRM_MSG)) return;
    setMusics(music);
    setModalOption({ type: 'close', target: null });
  };

  const handleCancelButton = () => setModalOption({ type: 'close', target: null });

  const pressEnterHandler: KeyboardEventHandler = (e) => {
    if (!answer.trim()) return;
    setAnswer('');
    setMusic((preState) => {
      return { ...preState, answers: [...preState.answers, answer.trim()] };
    });
  };

  const checkValidUrl = (url: string) => {
    return new RegExp(YOUTUBE_REG_EXP).test(url);
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
          background={theme.colors.sky}
          height="40px"
          width="150px"
          paddingH="10px"
          onClick={(e) => {
            setMusic({ info: '', hint: '', url: '', answers: [] });
            setAnswer('');
          }}
        >
          초기화
        </Button>
        <Button
          background={theme.colors.sky}
          height="40px"
          width="150px"
          paddingH="10px"
          onClick={() => setSearchModalOnOff(true)}
        >
          노래검색
        </Button>
      </MusicModalTop>
      <MusicModalInputBox>
        <MusicModalInputText
          handleChange={(e: ChangeEvent) => handleChange({ inputType: 'info' })(e)}
          className="info"
          isSearch={false}
          placeholder={MUSIC_INSERT_EXAMPLE_MSG}
          value={music.info}
        ></MusicModalInputText>
        <MusicModalInputText
          handleChange={(e: ChangeEvent) => handleChange({ inputType: 'hint' })(e)}
          className="hint"
          isSearch={false}
          placeholder={SHOW_HINT_MSG}
          value={music.hint}
        ></MusicModalInputText>
        <MusicModalInputText
          handleChange={(e: ChangeEvent) => handleChange({ inputType: 'url' })(e)}
          className="url"
          isSearch={false}
          placeholder={URL_EMPTY_MSG}
          value={music.url}
        ></MusicModalInputText>
        <MusicModalInputText
          handleChange={(e: ChangeEvent) => setAnswer((e.currentTarget as HTMLTextAreaElement).value)}
          handleEnter={pressEnterHandler}
          className="answer"
          isSearch={false}
          placeholder={MUSIC_ANSWER_MSG}
          value={answer}
        ></MusicModalInputText>
      </MusicModalInputBox>
      <MusicModalChipContainer>
        {music.answers.map((answer, idx) => (
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
      {searchModalOnOff && <SearchUrlModal setModalOnOff={setSearchModalOnOff} setMusic={setMusic} />}
    </Modal>
  );
};

export default CreatePlaylistMusicModal;
