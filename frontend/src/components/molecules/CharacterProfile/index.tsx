import { PropsWithChildren, useState } from 'react';

import { css } from '@emotion/react';
import styled from '@emotion/styled';

import Character from '~/atoms/Character';
import StatusChip from '~/atoms/StatusChip';
import useSocket from '~/hooks/useSocket';
import DelegateModal from '~/organisms/DelegateModal';
import theme from '~/styles/theme';
import { GameRoom } from '~/types/GameRoom';
import { SocketEvents } from '~/types/SocketEvents';

interface Props {
  id: string;
  mode: GameRoom['status'] | undefined;
  color: string;
  name: string;
  status: 'king' | 'ready' | 'prepare';
  skip: boolean;
  score: number;
  type: boolean;
  roomNo: string | null;
}

const ProfileContainer = styled.div`
  flex: 0 0 60px;
  width: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex: none;
    width: auto;
  }
`;

const ProfileCircle = styled.div`
  position: relative;
  background: ${theme.colors.white};
  border-radius: 50%;
  border: 2px solid ${theme.colors.mint};
  width: 50px;
  height: 50px;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: flex-end;

  @media (max-width: ${theme.breakpoints.md}) {
    width: 40px;
    height: 40px;
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    width: 34px;
    height: 34px;
  }
`;

const Container = styled.div<{ mode?: 'waiting' | 'playing' | 'resting' }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  column-gap: 8px;
  font-size: 16px;
  min-width: 60px;
  position: relative;

  &:hover > .btn_list {
    display: block;
  }

  @media (max-width: ${theme.breakpoints.md}) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 14px;
  }

  ${({ mode }) =>
    mode &&
    mode !== 'waiting' &&
    css`
      &:nth-child(-n + 3) ${ProfileCircle}::after {
        content: '';
        position: absolute;
        top: -10px;
        left: -14px;
        width: 30px;
        height: 30px;
        background-repeat: no-repeat;
        background-size: cover;
        z-index: 99;

        @media (max-width: ${theme.breakpoints.md}) {
          width: 26px;
          height: 26px;
        }
      }

      &:nth-child(1) ${ProfileCircle} {
        & {
          border-color: ${theme.colors.yellow};
        }

        &::after {
          background-image: url('/images/gold-medal.svg');
        }
      }

      &:nth-child(2) ${ProfileCircle} {
        & {
          border-color: ${theme.colors.gray};
        }

        &::after {
          background-image: url('/images/silver-medal.svg');
        }
      }

      &:nth-child(3) ${ProfileCircle} {
        & {
          border-color: ${theme.colors.peach};
        }

        &::after {
          background-image: url('/images/bronze-medal.svg');
        }
      }
    `}
`;

const Name = styled.p`
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  font-size: 1.1em;
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 0.8em;
  }
  text-align: right;
`;

const Point = styled(Name)`
  color: ${theme.colors.deepgray};
  line-height: 1.8;

  &::before {
    content: '포인트 : ';
  }
`;

const MidContainer = styled.div`
  display: flex;
  flex-direction: row;
  text-align: center;
  /* @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: row;
  } */
`;

const ChipContainer = styled.div`
  flex: 0 0 60px;
  width: 0;
  font-size: 0.8em;
  text-align: right;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex: none;
    width: auto;
  }
`;

const BtnList = styled.div`
  display: none;
  position: absolute;
  right: 0;
  text-align: center;

  @media (max-width: ${theme.breakpoints.md}) {
    right: auto;
    bottom: 0;
  }
`;

const KingBtn = styled.button`
  font-size: 0.64rem;
  cursor: pointer;
  background: ${theme.colors.white};
  border: 1px solid ${theme.colors.deepgray};
  border-radius: 4px;

  &:first-of-type {
    margin: 0 0.2rem 0 0;
  }

  @media (max-width: ${theme.breakpoints.md}) {
    &:first-of-type {
      margin: 0 0 0.1rem 0;
    }
  }
`;

const CharacterProfile = ({ id, mode, color, name, status, skip, score, type, roomNo }: PropsWithChildren<Props>) => {
  const [delegateModalOnOff, setDelegateModalOnOff] = useState<boolean>(false);
  const [delegatedUserName, setDelegatedUserName] = useState<string>('');
  const socket = useSocket();

  const handleOpenModal = (name: string) => {
    setDelegateModalOnOff(true);
    setDelegatedUserName(name);
  };

  const handleDelegate = (option: boolean) => (id: string) => {
    if (option) {
      socket?.emit(SocketEvents.SET_DELEGATE, roomNo, id);
    } else {
      socket?.emit(SocketEvents.SET_EXPULSION, roomNo, id);
    }
    setDelegateModalOnOff(false);
  };

  return (
    <Container mode={mode}>
      <ProfileContainer>
        <ProfileCircle>
          <Character color={color} width={'90%'} />
        </ProfileCircle>
      </ProfileContainer>
      <MidContainer>
        <Name>{name}</Name>
        {mode === 'playing' && <Point>{score}</Point>}
      </MidContainer>
      {mode === 'waiting' && <ChipContainer>{<StatusChip status={skip ? 'skip' : status} />}</ChipContainer>}
      {status !== 'king' && type && (
        <BtnList className="btn_list">
          <KingBtn onClick={() => handleOpenModal(name)}>방장위임</KingBtn>
          <KingBtn onClick={() => handleDelegate(false)(id)}>강퇴</KingBtn>
        </BtnList>
      )}
      {delegateModalOnOff && (
        <DelegateModal
          nickname={delegatedUserName}
          leftButtonHandler={() => handleDelegate(true)(id)}
          rightButtonHandler={() => setDelegateModalOnOff(false)}
        ></DelegateModal>
      )}
    </Container>
  );
};

export default CharacterProfile;
