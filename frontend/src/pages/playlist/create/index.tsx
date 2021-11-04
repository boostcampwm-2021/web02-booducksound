import { useState } from 'react';

import styled from '@emotion/styled';
import type { NextPage } from 'next';

import Button from '../../../components/atoms/Button';
import MenuInfoBox from '../../../components/atoms/MenuInfoBox';
import PageBox from '../../../components/atoms/PageBox';
import Chip from '../../../components/molecules/Chip';
import CreatePlaylistInputBox from '../../../components/organisms/CreatePlaylistInputBox';
import CreatePlaylistMusicList from '../../../components/organisms/CreatePlaylistMusicList';
import theme from '../../../styles/theme';
import { Music } from '../../../types/music';

const ChipContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  column-gap: 10px;
  row-gap: 10px;
  margin-bottom: 40px;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
`;
const SubmitButtonWrapper = styled.div`
  display: inline;
  text-align: center;
`;
const Container = styled.div`
  @media (max-width: 1200px) {
    & > div > :last-child {
      padding: 70px;
      border-radius: 100px;
    }
  }
  @media (max-width: 768px) {
    & > div > :last-child {
      padding: 50px;
      border-radius: 80px;
    }
  }
  @media (max-width: 480px) {
    & > div > :last-child {
      padding: 40px;
      border-radius: 60px;
    }
  }
`;

const PlaylistCreate: NextPage = () => {
  const [chips, setChips] = useState<string[]>([]);
  const [musics, setMusics] = useState<Music[]>([]);
  return (
    <Container>
      <MenuInfoBox name={'플레이리스트 추가'}></MenuInfoBox>
      <PageBox>
        <Wrapper>
          <CreatePlaylistInputBox />
          <ChipContainer>
            {chips.map((chip, idx) => (
              <Chip content={chip} key={idx}></Chip>
            ))}
          </ChipContainer>
          <CreatePlaylistMusicList musics={musics}></CreatePlaylistMusicList>
          <SubmitButtonWrapper>
            <Button
              content={'등록'}
              background={theme.colors.sky}
              fontSize={'1.5em'}
              paddingH={'2%'}
              width={'45%'}
            ></Button>
          </SubmitButtonWrapper>
        </Wrapper>
      </PageBox>
    </Container>
  );
};

export default PlaylistCreate;