import { ChangeEvent, KeyboardEventHandler, PropsWithChildren } from 'react';

import styled from '@emotion/styled';

import InputText from '~/atoms/InputText';
import TextLabel from '~/atoms/TextLabel';
import { PLAYLIST_TITLE_MSG, PLAYLIST_DESCRIPTION_MSG, PLAYLIST_HASH_TAG_MSG } from '~/constants/index';

type Props = {
  setPlaylist: Function;
  playlistName: string;
  description: string;
  hashtag: string;
  handleAddChipKeyUp: KeyboardEventHandler;
  handleAddChipKeyDown: KeyboardEventHandler;
};

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 25px;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    & > div > :last-child {
      height: 40px;
      padding-left: 30px;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    & > div > :last-child {
      height: 40px;
      padding-left: 20px;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
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

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    padding: 25px 10px 25px 45px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 20px 10px 20px 35px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
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
  description,
  hashtag,
  handleAddChipKeyUp,
  handleAddChipKeyDown,
}: PropsWithChildren<Props>) => {
  return (
    <InputContainer>
      <SectionBox>
        <TextLabel>플레이리스트 제목</TextLabel>
        <PlaylistInputText
          handleChange={(e: ChangeEvent) =>
            setPlaylist({ playlistName: (e.currentTarget as HTMLTextAreaElement).value })
          }
          value={playlistName}
          className="title"
          isSearch={false}
          placeholder={PLAYLIST_TITLE_MSG}
        ></PlaylistInputText>
      </SectionBox>
      <SectionBox>
        <TextLabel>플레이리스트 설명</TextLabel>
        <PlaylistInputText
          handleChange={(e: ChangeEvent) =>
            setPlaylist({ description: (e.currentTarget as HTMLTextAreaElement).value })
          }
          value={description}
          className="description"
          isSearch={false}
          placeholder={PLAYLIST_DESCRIPTION_MSG}
        ></PlaylistInputText>
      </SectionBox>
      <SectionBox>
        <TextLabel>플레이리스트 해시태그</TextLabel>
        <PlaylistInputText
          handleEnter={handleAddChipKeyUp}
          handleKeyDown={handleAddChipKeyDown}
          handleChange={(e: ChangeEvent) => setPlaylist({ hashtag: (e.currentTarget as HTMLTextAreaElement).value })}
          value={hashtag}
          className="hashag"
          isSearch={false}
          placeholder={PLAYLIST_HASH_TAG_MSG}
        ></PlaylistInputText>
      </SectionBox>
    </InputContainer>
  );
};

export default CreatePlaylistInputBox;
