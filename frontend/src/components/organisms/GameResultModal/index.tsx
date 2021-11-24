import { Dispatch, SetStateAction, useState } from 'react';

import styled from '@emotion/styled';

import { incrementLikeCount } from '~/api/playlist';
import { insertLikes } from '~/api/user';
import Modal from '~/molecules/Modal';
import ResultCharacter from '~/molecules/ResultCharacter';
import theme from '~/styles/theme';
import { GameRoom } from '~/types/GameRoom';

interface Props {
  gameRoom: GameRoom;
  userId: string;
  setModalOnOff: Dispatch<SetStateAction<boolean>>;
}

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  padding: 8px 0 24px 0;
  row-gap: 4px;
`;

const FirstLine = styled.p`
  position: relative;
  display: flex;
  justify-content: center;
`;

const McCharacter = styled.div`
  width: 58px;
  height: 58px;
  background: url(images/ic_booduck.png) no-repeat center bottom/contain;
`;

const Title = styled.h4`
  font-size: 32px;
  line-height: 64px;
  text-align: center;
`;

const ResultCharacterWrapper = styled.div`
  padding: 6px;
  overflow-y: auto;
  flex-grow: 1;
`;

const RecommendWrapper = styled.div`
  font-size: 18px;
  text-align: center;
  font-weight: 700;

  @media (max-width: ${theme.breakpoints.md}) {
    font-size: 16px;
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    font-size: 14px;
  }
`;

const RecommendContent = styled.p`
  colors: ${theme.colors.night};
`;

const RecommendAdditionalInfo = styled.p`
  color: ${theme.colors.deepgray};
`;

const Like = styled.button`
  border: none;
  background-color: inherit;
  font-size: 30px;
  text-align: center;
  font-weight: bolder;

  &:not([disabled]):hover {
    opacity: 50%;
  }
`;

const GameResultModal = ({ gameRoom, userId, setModalOnOff }: Props) => {
  const [isClickedLikeBtn, setIsClickedLikeBtn] = useState<boolean>(false);

  const handleClickLikeBtn = () => {
    incrementLikeCount(gameRoom.playlistId);
    insertLikes(gameRoom.playlistId, userId);
    setIsClickedLikeBtn(true);
  };

  return (
    <Modal
      hasOnlyCancleBtn={true}
      rightButtonText="닫기"
      height="718px"
      rightButtonHandler={() => setModalOnOff(false)}
    >
      <Container>
        <FirstLine>
          <McCharacter />
          <Title>결과</Title>
        </FirstLine>
        <ResultCharacterWrapper>
          {gameRoom &&
            Object.values(gameRoom.players)
              .sort((a, b) => b.score - a.score)
              .map((player, i) => <ResultCharacter key={i} player={player} />)}
        </ResultCharacterWrapper>
        <RecommendWrapper>
          <RecommendContent>
            이 플레이리스트가 좋으셨다면
            <Like onClick={handleClickLikeBtn} disabled={isClickedLikeBtn}>
              👍
            </Like>
            를 눌러주세요!
          </RecommendContent>
          <RecommendAdditionalInfo>누르신 좋아요는 MY PAGE에서 확인할 수 있습니다.</RecommendAdditionalInfo>
        </RecommendWrapper>
      </Container>
    </Modal>
  );
};

export default GameResultModal;
