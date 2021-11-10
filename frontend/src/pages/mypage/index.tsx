import JSX, { MouseEvent, useEffect, useState } from 'react';

import styled from '@emotion/styled';
import { NextPage } from 'next';
import Link from 'next/link';
import Router from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

import { getUser } from '~/actions/user';
import { requestLogout } from '~/api/account';
import { changeColor, deleteLikes } from '~/api/user';
import Button from '~/atoms/Button';
import MenuInfoBox from '~/atoms/MenuInfoBox';
import PageBox from '~/atoms/PageBox';
import ProfileSelector from '~/atoms/ProfileSelector';
import { PLAYLIST_EMPTY_MSG } from '~/constants/index';
import Modal from '~/molecules/Modal';
import { RootState } from '~/reducers/index';
import { UserState } from '~/reducers/user';
import theme from '~/styles/theme';
import { Playlist } from '~/types/Playlist';

interface Props {
  num: number;
}

const MyPageContainer = styled.div`
  height: max-content;
  margin: auto;
  text-align: center;

  @media (max-width: 768px) {
    a > button {
    }
  }
`;

const ProfileBtnBox = styled.div`
  text-align: right;

  @media (min-width: 768px) {
    margin-bottom: 1rem;

    > *:first-of-type {
      margin-right: 1rem;
    }
  }

  @media (max-width: 768px) {
    button {
      margin-bottom: 0.4rem;
    }
  }
  @media (max-width: 480px) {
    margin-bottom: 1rem;

    button {
      padding: 8px 0;
      font-size: 0.8rem;
      width: 90%;
      display: block;
      margin: 0 auto 0.4rem auto;
    }
  }
`;

const TableBtnBox = styled.div`
  > button {
    margin-bottom: 0.4rem;
  }
`;

const ProfileBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid ${theme.colors.gray};

  > div:first-of-type {
    flex-grow: 0;
  }

  > div:last-child {
    flex-grow: 1;
  }

  @media (max-width: 480px) {
    display: block;
  }
`;

const UserInfoBox = styled.div`
  display: flex;
  align-items: center;
`;

const UserInfo = styled.div`
  padding: 0 2rem;
  margin-bottom: 2.4rem;
  text-align: left;

  .user-name {
    font-size: 1.2rem;
    line-height: 2rem;
  }

  .user-id {
    color: ${theme.colors.gray};
  }
`;

const PlayListTable = styled.table`
  margin: 0;
  width: 100%;

  > li {
    .play-title {
      font-weight: 600;
      font-size: 1.2rem;
    }
  }

  tr:not(.no-result) {
    &:not(:last-child) {
      border-bottom: 1px solid ${theme.colors.gray};
    }

    &:hover {
      background-color: ${theme.colors.lightsky};
    }

    > td {
      vertical-align: middle;
      padding: 0.5rem 1rem;
    }
  }
`;

const PlayTitle = styled.h4`
  text-align: left;
  font-size: 1.2rem;
`;

const BoxTitle = styled.h2<Props>`
  text-align: left;
  font-size: 1.3rem;
  margin: 2.8rem 0 2rem 0;

  &::after {
    content: '총 ${({ num }) => num}개';
    letter-spacing: 1px;
    font-size: 0.95rem;
    display: inline-block;
    margin-left: 1rem;
    color: ${theme.colors.ocean};
  }
`;

const EmptyPlayList = styled.tr`
  border: 1px solid ${theme.colors.gray};
  border-width: 1px 0 1px 0;
  color: ${theme.colors.gray};

  > td {
    padding: 8rem 0 !important;
  }
`;

const AlertMsg = styled.p`
  text-align: center;
  font-size: 1.2rem;
  margin: 1.5rem 0;
`;

const handleUserMenu = (id: string, dom: JSX.ReactElement) => {
  if (id) return dom;
};

const updatePlaylist = (_id: string | undefined) => (e: MouseEvent) => {
  if (!_id) return;
  Router.push(`/playlist/${_id}`);
};
const deletePlaylist = () => {};

const MyPage: NextPage = () => {
  const [color, setColor] = useState('fff');
  const [removeModalOnOff, setRemoveModalOnOff] = useState(false);
  const [oid, selectOid] = useState('');

  const dispatch = useDispatch();
  const userInfo: UserState = useSelector((state: RootState) => state.user);
  const { id, nickname, color: userColor, likes, myPlaylist } = userInfo || {};

  const deleteLikeslist = async (id: string, oid: string) => {
    await deleteLikes(id, oid);
    dispatch(getUser());
  };

  const openRemoveModal = ({ target }: any) => {
    const { id } = target?.parentElement?.closest('tr').dataset;
    setRemoveModalOnOff(true);
    selectOid(id);
  };
  const drawMyPlaylist = (myPlaylist: Playlist[], isMine: boolean = false) => {
    if (!myPlaylist.length) {
      return (
        <EmptyPlayList className="no-result">
          <td colSpan={2}>{PLAYLIST_EMPTY_MSG}</td>
        </EmptyPlayList>
      );
    }
    return myPlaylist.map((e) => (
      <tr key={e._id} data-id={e._id} data-writer={e.userId}>
        <td>
          <PlayTitle>{e.playlistName}</PlayTitle>
        </td>
        <td>
          <TableBtnBox>
            {isMine && (
              <Button
                content={'수정'}
                background={theme.colors.sky}
                fontSize={'14px'}
                paddingH={'8px'}
                width={'100px'}
                onClick={updatePlaylist(e._id)}
              ></Button>
            )}
            <Button
              content={'삭제'}
              background={theme.colors.peach}
              fontSize={'14px'}
              paddingH={'8px'}
              width={'100px'}
              onClick={isMine ? deletePlaylist : openRemoveModal}
            ></Button>
          </TableBtnBox>
        </td>
      </tr>
    ));
  };

  const changeBooduckColor = (newColor: string) => {
    setColor(() => {
      changeColor(id, newColor);

      return newColor;
    });
  };

  useEffect(() => {
    setColor(userColor);
  }, [userColor]);

  useEffect(() => {
    setRemoveModalOnOff(false);
  }, [likes, myPlaylist]);

  return (
    <>
      <MenuInfoBox name="마이페이지" />
      <PageBox>
        <MyPageContainer>
          <ProfileBox>
            <UserInfoBox>
              <ProfileSelector type="mypage" color={color} setColor={changeBooduckColor}></ProfileSelector>
              <UserInfo>
                <p className="user-name">{nickname}</p>
                <p className="user-id">{id || '비회원'}</p>
              </UserInfo>
            </UserInfoBox>
            <ProfileBtnBox>
              {handleUserMenu(
                id,
                <Link href="/findPwd">
                  <a>
                    <Button
                      content={'비밀번호 변경'}
                      background={theme.colors.lime}
                      fontSize={'16px'}
                      paddingH={'16px'}
                      width={'160px'}
                    ></Button>
                  </a>
                </Link>,
              )}
              <Button
                content={'로그아웃'}
                background={theme.colors.lightsky}
                fontSize={'16px'}
                paddingH={'16px'}
                width={'160px'}
                onClick={requestLogout}
              ></Button>
            </ProfileBtnBox>
          </ProfileBox>
          {handleUserMenu(
            id,
            <>
              <BoxTitle num={myPlaylist?.length}>내가 작성한 플레이리스트</BoxTitle>
              <PlayListTable>
                <colgroup>
                  <col width="100%" />
                  <col width="*" />
                </colgroup>
                <tbody>{myPlaylist && drawMyPlaylist(myPlaylist, true)}</tbody>
              </PlayListTable>
              <BoxTitle num={likes?.length}>내가 좋아요한 플레이리스트</BoxTitle>
              <PlayListTable>
                <colgroup>
                  <col width="100%" />
                  <col width="*" />
                </colgroup>
                <tbody>{likes && drawMyPlaylist(likes)}</tbody>
              </PlayListTable>
            </>,
          )}
        </MyPageContainer>
      </PageBox>
      {removeModalOnOff && (
        <Modal
          leftButtonHandler={(e) => deleteLikeslist(id, oid)}
          rightButtonHandler={() => setRemoveModalOnOff(false)}
          leftButtonText="YES"
          rightButtonText="NO"
          height="150px"
        >
          <AlertMsg>정말 삭제하시겠습니까?</AlertMsg>
        </Modal>
      )}
    </>
  );
};

export default MyPage;
