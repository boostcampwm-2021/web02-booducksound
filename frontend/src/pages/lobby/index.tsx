import styled from '@emotion/styled';
import type { NextPage } from 'next';

import Button from '../../components/atoms/Button';
import InputBox from '../../components/atoms/InputBox';
import RoomCard from '../../components/atoms/RoomCard';
import theme from '../../styles/theme';

const Container = styled.div`
  display: flex;
  justify-content: center;
  overflow: hidden;
`;

const Wrapper = styled.div`
  max-width: 1600px;
  width: 100%;
`;

const NavItem = styled.div`
  display: flex;
  height: fit-content;
  column-gap: 10px;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    column-gap: 6px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    column-gap: 4px;
  }
`;

const Nav = styled.nav`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 32px 8px;
  column-gap: 10px;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 8px 4px;
    row-gap: 6px;
    column-gap: 6px;
    flex-wrap: wrap;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 8px 2px;
    column-gap: 4px;
  }
`;

const ButtonWrapper = styled.div`
  width: 180px;
  height: 100%;
  font-size: 20px;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 110px;
    font-size: 12px;
  }
`;

const SearchContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
  margin-bottom: 48px;
`;

const SearchWrapper = styled.div`
  padding: 0 8px;
  width: 720px;
  justify-content: center;
`;

interface ButtonContainerProps {
  background: string;
  content: string;
  fontSize?: number;
}

const ResponsiveButton = ({ background, content }: ButtonContainerProps) => {
  return (
    <ButtonWrapper>
      <Button content={content} background={background}></Button>
    </ButtonWrapper>
  );
};

const GridContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 0 8px;
`;

const GridWrapper = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(3, 1fr);
  justify-items: stretch;
  row-gap: 12px;
  column-gap: 12px;
  margin: 0 auto;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const Lobby: NextPage = () => {
  return (
    <Container>
      <Wrapper>
        <Nav>
          <NavItem>
            <ResponsiveButton background={theme.colors.lime} fontSize={20} content={'MY PAGE'} />
          </NavItem>
          <NavItem>
            <ResponsiveButton background={theme.colors.lightsky} fontSize={20} content={'초대코드 입력'} />
            <ResponsiveButton background={theme.colors.peach} fontSize={20} content={'플레이리스트 추가'} />
            <ResponsiveButton background={theme.colors.sand} fontSize={20} content={'방 생성'} />
          </NavItem>
        </Nav>
        <SearchContainer>
          <SearchWrapper>
            <InputBox
              isSearch={true}
              placeholder={'검색어를 입력하세요'}
              width={'100%'}
              height={'54px'}
              fontSize={'18px'}
            ></InputBox>
          </SearchWrapper>
        </SearchContainer>
        <GridContainer>
          <GridWrapper>
            <RoomCard
              title={'방 제목'}
              playlistName={'플레이리스트이름'}
              hashtags={['해시1', '해시2']}
              curPeople={0}
              maxPeople={8}
            />
            <RoomCard
              title={'방 제목'}
              playlistName={'플레이리스트이름'}
              hashtags={['해시1', '해시2']}
              curPeople={0}
              maxPeople={8}
            />
            <RoomCard
              title={'방 제목'}
              playlistName={'플레이리스트이름'}
              hashtags={['해시1', '해시2']}
              curPeople={0}
              maxPeople={8}
            />
            <RoomCard
              title={'방 제목'}
              playlistName={'플레이리스트이름'}
              hashtags={['해시1', '해시2']}
              curPeople={0}
              maxPeople={8}
            />
            <RoomCard
              title={'방 제목'}
              playlistName={'플레이리스트이름'}
              hashtags={['해시1', '해시2']}
              curPeople={0}
              maxPeople={8}
            />
            <RoomCard
              title={'방 제목'}
              playlistName={'플레이리스트이름'}
              hashtags={['해시1', '해시2']}
              curPeople={0}
              maxPeople={8}
            />
            <RoomCard
              title={'방 제목'}
              playlistName={'플레이리스트이름'}
              hashtags={['해시1', '해시2']}
              curPeople={0}
              maxPeople={8}
            />
            <RoomCard
              title={'방 제목'}
              playlistName={'플레이리스트이름'}
              hashtags={['해시1', '해시2']}
              curPeople={0}
              maxPeople={8}
            />
            <RoomCard
              title={'방 제목'}
              playlistName={'플레이리스트이름'}
              hashtags={['해시1', '해시2']}
              curPeople={0}
              maxPeople={8}
            />
            <RoomCard
              title={'방 제목'}
              playlistName={'플레이리스트이름'}
              hashtags={['해시1', '해시2']}
              curPeople={0}
              maxPeople={8}
            />
            <RoomCard
              title={'방 제목'}
              playlistName={'플레이리스트이름'}
              hashtags={['해시1', '해시2']}
              curPeople={0}
              maxPeople={8}
            />
            <RoomCard
              title={'방 제목'}
              playlistName={'플레이리스트이름'}
              hashtags={['해시1', '해시2']}
              curPeople={0}
              maxPeople={8}
            />
            <RoomCard
              title={'방 제목'}
              playlistName={'플레이리스트이름'}
              hashtags={['해시1', '해시2']}
              curPeople={0}
              maxPeople={8}
            />
            <RoomCard
              title={'방 제목'}
              playlistName={'플레이리스트이름'}
              hashtags={['해시1', '해시2']}
              curPeople={0}
              maxPeople={8}
            />
            <RoomCard
              title={'방 제목'}
              playlistName={'플레이리스트이름'}
              hashtags={['해시1', '해시2']}
              curPeople={0}
              maxPeople={8}
            />
            <RoomCard
              title={'방 제목'}
              playlistName={'플레이리스트이름'}
              hashtags={['해시1', '해시2']}
              curPeople={0}
              maxPeople={8}
            />
            <RoomCard
              title={'방 제목'}
              playlistName={'플레이리스트이름'}
              hashtags={['해시1', '해시2']}
              curPeople={0}
              maxPeople={8}
            />
            <RoomCard
              title={'방 제목'}
              playlistName={'플레이리스트이름'}
              hashtags={['해시1', '해시2']}
              curPeople={0}
              maxPeople={8}
            />
          </GridWrapper>
        </GridContainer>
      </Wrapper>
    </Container>
  );
};

export default Lobby;
