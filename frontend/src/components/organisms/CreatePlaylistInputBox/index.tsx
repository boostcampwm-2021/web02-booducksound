import { KeyboardEventHandler, PropsWithChildren } from 'react';

import styled from '@emotion/styled';

import InputText from '~/atoms/InputText';
import TextLabel from '~/atoms/TextLabel';

interface Props {
  setPlaylist: Function;
  handleAddChip: KeyboardEventHandler;
  playlistName: string;
  description: string;
  hashTag: string;
}

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 25px;
  @media (max-width: 1200px) {
    & > div > :last-child {
      height: 40px;
      padding-left: 30px;
    }
  }
  @media (max-width: 768px) {
    & > div > :last-child {
      height: 40px;
      padding-left: 20px;
    }
  }
  @media (max-width: 480px) {
    & > div > :last-child {
      height: 35px;
      padding-left: 10px;
    }
  }
`;
const PlaylistInputText = styled(InputText)`
  width: 98%;
  height: 3em;
  padding: 25px 10px 25px 45px;
  @media (max-width: 1200px) {
    padding: 25px 10px 25px 45px;
  }
  @media (max-width: 768px) {
    padding: 20px 10px 20px 35px;
  }
  @media (max-width: 480px) {
    padding: 15px 10px 15px 20px;
  }
`;
const SectionBox = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 15px;
`;

const CreatePlaylistInputBox = ({
  setPlaylist,
  playlistName,
  handleAddChip,
  description,
  hashTag,
}: PropsWithChildren<Props>) => {
  return (
    <InputContainer>
      <SectionBox>
        <TextLabel>플레이리스트 제목</TextLabel>
        <PlaylistInputText
          handleChange={(e) => setPlaylist({ playlistName: (e.currentTarget as HTMLTextAreaElement).value })}
          value={playlistName}
          className="title"
          isSearch={false}
          placeholder="플레이리스트 제목을 입력해주세요."
        ></PlaylistInputText>
      </SectionBox>
      <SectionBox>
        <TextLabel>플레이리스트 설명</TextLabel>
        <PlaylistInputText
          handleChange={(e) => setPlaylist({ description: (e.currentTarget as HTMLTextAreaElement).value })}
          value={description}
          className="description"
          isSearch={false}
          placeholder="플레이리스트 설명을 입력해주세요."
        ></PlaylistInputText>
      </SectionBox>
      <SectionBox>
        <TextLabel>플레이리스트 해시태그</TextLabel>
        <PlaylistInputText
          handleEnter={handleAddChip}
          handleChange={(e) => setPlaylist({ hashTag: (e.currentTarget as HTMLTextAreaElement).value })}
          value={hashTag}
          className="hashTag"
          isSearch={false}
          placeholder="추가할 해시태그를 입력 후 Enter를 클릭하세요."
        ></PlaylistInputText>
      </SectionBox>
    </InputContainer>
  );
};

export default CreatePlaylistInputBox;
