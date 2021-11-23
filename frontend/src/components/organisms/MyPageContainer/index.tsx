import styled from '@emotion/styled';
import { useSelector } from 'react-redux';

import MyPlayListBox from '~/molecules/MyPlayListBox';
import ProfileBox from '~/molecules/ProfileBox';
import { RootState } from '~/reducers/index';
import { UserState } from '~/reducers/user';
import theme from '~/styles/theme';

const Container = styled.div`
  width: 100%;
  height: 100%;
  text-align: center;
  align-self: flex-start;
`;

const Information = styled.p`
  font-size: 20px;
  padding-top: 64px;

  @media (max-width: ${theme.breakpoints.md}) {
    font-size: 16px;
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    font-size: 14px;
  }
`;

const MyPageContainer = ({ openRemoveModal }: { openRemoveModal: (id: string) => () => void }) => {
  const userInfo: UserState = useSelector((state: RootState) => state.user);
  const { id, nickname, color: userColor, likes, myPlaylist } = userInfo || {};

  return (
    <Container>
      <ProfileBox info={{ id, nickname, userColor }} />
      {id ? (
        <MyPlayListBox info={{ id, likes, myPlaylist }} openRemoveModal={openRemoveModal} />
      ) : (
        <Information>회원으로 로그인 하면 자신의 플레이리스트를 확인할 수 있습니다.</Information>
      )}
    </Container>
  );
};

export default MyPageContainer;
