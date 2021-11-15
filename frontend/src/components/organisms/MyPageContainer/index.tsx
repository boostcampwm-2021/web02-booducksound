import JSX, { useEffect } from 'react';

import styled from '@emotion/styled';
import { useSelector } from 'react-redux';

import MyPlayListBox from '~/molecules/MyPlayListBox';
import ProfileBox from '~/molecules/ProfileBox';
import { RootState } from '~/reducers/index';
import { UserState } from '~/reducers/user';
import theme from '~/styles/theme';

const Container = styled.div`
  height: max-content;
  margin: auto;
  text-align: center;

  @media (max-width: ${theme.breakpoints.md}px) {
    a > button {
    }
  }
`;

const MyPageContainer = ({ openRemoveModal }: { openRemoveModal: ({ target }: any) => void }) => {
  const userInfo: UserState = useSelector((state: RootState) => state.user);
  const { id, nickname, color: userColor, likes, myPlaylist } = userInfo || {};
  const handleUserMenu = (id: string, dom: JSX.ReactElement) => {
    if (id) return dom;
  };

  return (
    <Container>
      <ProfileBox info={{ id, nickname, userColor }} handleUserMenu={handleUserMenu} />
      <MyPlayListBox
        info={{ id, likes, myPlaylist }}
        handleUserMenu={handleUserMenu}
        openRemoveModal={openRemoveModal}
      />
    </Container>
  );
};

export default MyPageContainer;
