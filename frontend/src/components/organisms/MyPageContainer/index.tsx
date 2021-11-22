import JSX from 'react';

import styled from '@emotion/styled';
import { useSelector } from 'react-redux';

import MyPlayListBox from '~/molecules/MyPlayListBox';
import ProfileBox from '~/molecules/ProfileBox';
import { RootState } from '~/reducers/index';
import { UserState } from '~/reducers/user';

const Container = styled.div`
  height: max-content;
  margin: auto;
  text-align: center;
`;

const MyPageContainer = ({ openRemoveModal }: { openRemoveModal: (id: string) => () => void }) => {
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
