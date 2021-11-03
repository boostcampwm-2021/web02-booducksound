import { useState } from 'react';

import styled from '@emotion/styled';
import type { NextPage } from 'next';

import Button from '../../../components/atoms/Button';
import Chip from '../../../components/atoms/Chip';
import MenuInfoBox from '../../../components/atoms/MenuInfoBox';
import PageBox from '../../../components/atoms/PageBox';
import InputSection from '../../../components/molecules/InputSection';
import theme from '../../../styles/theme';

// 반응형으로 처리할 것 : InputSection

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
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
`;
const MusicListTitleTop = styled.div`
  display: flex;
  align-items: center;
  column-gap: 5px;
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
  const [chips, setChips] = useState(['asdf', 'wviasd', 'adf']);
  return (
    <Container>
      <MenuInfoBox name={'플레이리스트 추가'}></MenuInfoBox>
      <PageBox>
        <Wrapper>
          <InputContainer>
            <InputSection
              id={'playlist-title'}
              title={'플레이리스트 제목'}
              titleSize={'1em'}
              isSearch={false}
              placeholder={'플레이리스트 제목을 입력해주세요'}
              width={'100%'}
              height={'3em'}
              fontSize={'0.85em'}
              margin={'0.6em'}
              paddingW={'40px'}
            ></InputSection>
            <InputSection
              id={'playlist-title'}
              title={'플레이리스트 설명'}
              titleSize={'1em'}
              isSearch={false}
              placeholder={'플레이리스트 설명을 입력해주세요'}
              width={'100%'}
              height={'3em'}
              fontSize={'0.85em'}
              margin={'0.6em'}
              paddingW={'40px'}
            ></InputSection>
            <InputSection
              id={'playlist-title'}
              title={'플레이리스트 해시태그'}
              titleSize={'1em'}
              isSearch={false}
              placeholder={'추가할 해시태그를 입력 후 Enter를 클릭하세요'}
              width={'100%'}
              height={'3em'}
              fontSize={'0.85em'}
              margin={'0.6em'}
              paddingW={'40px'}
            ></InputSection>
          </InputContainer>
          <ChipContainer>
            {chips.map((chip, idx) => (
              <Chip color={theme.colors.soda} content={chip} fontSize={'0.8em'} key={idx}></Chip>
            ))}
          </ChipContainer>
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
            <MusicListContentBox></MusicListContentBox>
          </MusicListContainer>
        </Wrapper>
      </PageBox>
    </Container>
  );
};

export default PlaylistCreate;
