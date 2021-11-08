import styled from '@emotion/styled';

import { LobbyRoom } from '~/types/LobbyRoom';

interface ContainerProps {
  status: 'playing' | 'waiting';
}

const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.white};
  height: 180px;
  padding: 36px 24px;
  box-shadow: ${({ theme }) => `0 0 20px ${theme.colors.deepgray}`};
  border-radius: 16px;
  overflow: hidden;
  filter: ${({ status }) => status === 'playing' && 'brightness(0.86)'};
  cursor: ${({ status }) => status === 'waiting' && 'pointer'};

  &:hover {
    filter: ${({ status }) => status === 'waiting' && 'brightness(0.96)'};
  }

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

const FirstLineRightContainer = styled.div`
  display: flex;
  align-items: center;
  column-gap: 6px;
`;

const NumberOfPeople = styled.span`
  font-size: 24px;
  color: ${({ theme }) => theme.colors.deepgray};
  white-space: nowrap;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 18px;
  }
`;

const Lock = styled.img`
  width: 18px;
  transform: translateY(-1px);

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 14px;
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

const RoomCard = ({ title, playlistName, hashtags, curPeople, maxPeople, status, hasPassword }: LobbyRoom) => {
  return (
    <Container status={status}>
      <FirstLineContainer>
        <Title>{title}</Title>
        <FirstLineRightContainer>
          {hasPassword && <Lock src="/images/lock.svg" />}
          <NumberOfPeople>
            {curPeople}/{maxPeople}
          </NumberOfPeople>
        </FirstLineRightContainer>
      </FirstLineContainer>
      <PlaylistName>{playlistName}</PlaylistName>
      <HashtagContainer>
        {hashtags && hashtags.map((hashtag, i) => <Hashtag key={i}>#{hashtag}</Hashtag>)}
      </HashtagContainer>
    </Container>
  );
};

export default RoomCard;
