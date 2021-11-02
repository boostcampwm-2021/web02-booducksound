import styled from '@emotion/styled';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background: #fff;
  height: 180px;
  padding: 36px 24px;
  box-shadow: ${({ theme }) => `0 0 20px ${theme.colors.deepgray}`};
  border-radius: 16px;
  overflow: hidden;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    height: 120px;
    padding: 16px 12px;
  }
`;

const FirstLineContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Title = styled.h3`
  font-size: 24px;
  font-weight: 600;
  color: #000;
  white-space: nowrap;
  overflow: hidden;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 18px;
  }
`;

const NumberOfPeople = styled.span`
  font-size: 24px;
  color: ${({ theme }) => theme.colors.deepgray};
  white-space: nowrap;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 18px;
  }
`;

const PlaylistName = styled.h4`
  font-size: 20px;
  color: ${({ theme }) => theme.colors.deepgray};
  white-space: nowrap;
  overflow: hidden;
  margin-top: 16px;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 16px;
  }
`;

const HashtagContainer = styled.div`
  display: flex;
  overflow: hidden;
  margin-top: 24px;
  column-gap: 4px;
`;

const Hashtag = styled.span`
  font-size: 18px;
  color: ${({ theme }) => theme.colors.ocean};
  white-space: nowrap;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 14px;
  }
`;

interface Props {
  title: string;
  playlistName: string;
  hashtags: string[];
  maxPeople: number;
  curPeople: number;
}

const RoomCard = ({ title, playlistName, hashtags, curPeople, maxPeople }: Props) => {
  return (
    <Container>
      <FirstLineContainer>
        <Title>{title}</Title>
        <NumberOfPeople>
          {curPeople}/{maxPeople}
        </NumberOfPeople>
      </FirstLineContainer>
      <PlaylistName>{playlistName}</PlaylistName>
      <HashtagContainer>
        {hashtags && hashtags.map((hashtag, i) => <Hashtag key={i}>#{hashtag}</Hashtag>)}
      </HashtagContainer>
    </Container>
  );
};

export default RoomCard;
