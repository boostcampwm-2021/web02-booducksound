import { PropsWithChildren } from 'react';

import styled from '@emotion/styled';

import theme from '../../../styles/theme';
import { Music } from '../../../types/music';
import Button from '../../atoms/Button';
import CreatePlaylistMusicItem from '../../molecules/CreatePlaylistMusicItem';

interface Props {
  musics: Music[];
}

const MusicListContainer = styled.div``;
const MusicListTitleBox = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 15px;
  border-bottom: 2px solid #eee;
`;
const MusicListContentBox = styled.div`
  height: 350px;
  border-bottom: 2px solid #eee;
  overflow-y: scroll;
`;
const MusicListTitleTop = styled.div`
  display: flex;
  align-items: center;
  column-gap: 30px;
  @media (max-width: 1200px) {
    column-gap: 30px;
  }
  @media (max-width: 768px) {
    column-gap: 20px;
  }
  @media (max-width: 480px) {
    column-gap: 10px;
  }
`;
const MusicListTitleBottom = styled.div`
  color: ${theme.colors.gray};
  margin-bottom: 30px;
`;
const MusicListTitle = styled.div`
  font-weight: bold;
  @media (min-width: 480px) {
    font-size: 15px;
  }
  @media (min-width: 768px) {
    font-size: 20px;
  }
  @media (min-width: 1200px) {
    font-size: 25px;
  }
`;
const EmptyBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  color: #ddd;
`;
const CreatePlaylistMusicList = ({ musics }: PropsWithChildren<Props>) => {
  return (
    <MusicListContainer>
      <MusicListTitleBox>
        <MusicListTitleTop>
          <MusicListTitle>노래 목록</MusicListTitle>
          <Button
            content={'추가'}
            background={theme.colors.mint}
            fontSize={'12px'}
            paddingH={'7px'}
            width={'100px'}
          ></Button>
        </MusicListTitleTop>
        <MusicListTitleBottom>최소 3개, 최대 50개까지 추가가 가능합니다.</MusicListTitleBottom>
      </MusicListTitleBox>
      <MusicListContentBox>
        {!musics.length ? (
          <EmptyBox>노래를 추가해 주세요.</EmptyBox>
        ) : (
          musics.map((music, idx) => <CreatePlaylistMusicItem title={music.title} key={idx} />)
        )}
      </MusicListContentBox>
    </MusicListContainer>
  );
};

export default CreatePlaylistMusicList;
