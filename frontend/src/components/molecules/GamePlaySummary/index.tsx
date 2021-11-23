import styled from '@emotion/styled';

import Timer from '~/atoms/Timer';
import theme from '~/styles/theme';
import { GameRoom } from '~/types/GameRoom';

const TimerWrapper = styled.div`
  position: absolute;
  top: -24px;
  left: -28px;
  width: 100px;
  height: 100px;
  font-size: 28px;
  font-weight: 700;

  @media (max-width: ${theme.breakpoints.lg}) {
    font-size: 24px;
    top: -20px;
    left: -20px;
    width: 84px;
    height: 84px;
  }

  @media (max-width: ${theme.breakpoints.md}) {
    position: fixed;
    font-size: 24px;
    width: 64px;
    height: 64px;
    top: 52px;
    left: 12px;
    transform: translate(0, 0);
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    font-size: 18px;
    width: 58px;
    height: 58px;
  }
`;

const Round = styled.p`
  font-size: 18px;
  font-family: ${theme.fonts.gmarket};

  &::after {
    content: 'Round ';
    margin-left: 8px;
  }

  @media (max-width: ${theme.breakpoints.md}) {
    font-size: 16px;
  }
`;

const GamePlaySummary = ({ gameRoom, endTime }: { gameRoom: GameRoom; endTime: number }) => {
  const { curRound, maxRound } = gameRoom;
  const initSec = Math.floor((endTime - Date.now()) / 1000);

  return (
    <>
      <TimerWrapper>
        <Timer initSec={initSec} resetTrigger={gameRoom.curRound} />
      </TimerWrapper>
      <Round>
        {curRound} / {maxRound}
      </Round>
    </>
  );
};

export default GamePlaySummary;
