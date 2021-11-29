import styled from '@emotion/styled';
import { useSelector } from 'react-redux';

import { NON_USER_MYPAGE_MSG } from '~/constants/index';
import MyPlayListBox from '~/molecules/MyPlayListBox';
import ProfileBox from '~/molecules/ProfileBox';
import { RootState } from '~/reducers/index';
import { UserState } from '~/reducers/user';

const Container = styled.div`
  width: 100%;
  height: 100%;
  text-align: center;
  align-self: flex-start;
  margin-bottom: auto;
`;

const Information = styled.p`
  font-size: 20px;
  padding-top: 64px;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 16px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
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
        <Information>{NON_USER_MYPAGE_MSG}</Information>
      )}
    </Container>
  );
};

export default MyPageContainer;
