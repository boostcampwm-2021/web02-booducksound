import { MouseEvent } from 'react';

import styled from '@emotion/styled';
import Router from 'next/router';

import BoxTitle from '~/atoms/BoxTitle';
import Button from '~/atoms/Button';
import PlayListTable from '~/atoms/PlayListTable';
import { PLAYLIST_EMPTY_MSG } from '~/constants/index';
import theme from '~/styles/theme';
import { Playlist } from '~/types/Playlist';

type Info = {
  id: string;
  likes: any;
  myPlaylist: Playlist[];
};

type Props = {
  info: Info;
  handleUserMenu: Function;
  openRemoveModal: ({ target }: any) => void;
};

const TableBtnBox = styled.div`
  > button {
    margin-bottom: 0.4rem;
  }
`;

const PlayTitle = styled.h4`
  text-align: left;
  font-size: 1.2rem;
`;

const EmptyPlayList = styled.tr`
  border: 1px solid ${theme.colors.gray};
  border-width: 1px 0 1px 0;
  color: ${theme.colors.gray};

  > td {
    padding: 8rem 0 !important;
  }
`;

const deletePlaylist = () => {};

const updatePlaylist = (_id: string | undefined) => (e: MouseEvent) => {
  if (!_id) return;
  Router.push(`/playlist/${_id}`);
};

const drawMyPlaylistBox = (
  myPlaylist: Playlist[] | any,
  isMine: boolean,
  openRemoveModal: ({ target }: any) => void,
) => {
  if (myPlaylist === undefined) return;
  if (!myPlaylist.length) {
    return (
      <EmptyPlayList className="no-result">
        <td colSpan={2}>{PLAYLIST_EMPTY_MSG}</td>
      </EmptyPlayList>
    );
  } else {
    return myPlaylist.map((e: Playlist) => (
      <tr key={e._id} data-id={e._id} data-writer={e.userId}>
        <td>
          <PlayTitle>{e.playlistName}</PlayTitle>
        </td>
        <td>
          <TableBtnBox>
            {isMine && (
              <Button
                background={theme.colors.sky}
                fontSize={'14px'}
                paddingH={'8px'}
                width={'100px'}
                onClick={updatePlaylist(e._id)}
              >
                수정
              </Button>
            )}
            <Button
              background={theme.colors.peach}
              fontSize={'14px'}
              paddingH={'8px'}
              width={'100px'}
              onClick={isMine ? deletePlaylist : openRemoveModal}
            >
              삭제
            </Button>
          </TableBtnBox>
        </td>
      </tr>
    ));
  }
};

const MyPlayListBox = ({ info, handleUserMenu, openRemoveModal }: Props) => {
  const { id, likes, myPlaylist } = info;
  return (
    <>
      {handleUserMenu(
        id,
        <>
          <BoxTitle num={myPlaylist?.length}>내가 작성한 플레이리스트</BoxTitle>
          <PlayListTable>
            <colgroup>
              <col width="100%" />
              <col width="*" />
            </colgroup>
            <tbody>{drawMyPlaylistBox(myPlaylist, true, openRemoveModal)}</tbody>
          </PlayListTable>
          <BoxTitle num={likes?.length}>내가 좋아요한 플레이리스트</BoxTitle>
          <PlayListTable>
            <colgroup>
              <col width="100%" />
              <col width="*" />
            </colgroup>
            <tbody>{drawMyPlaylistBox(likes, false, openRemoveModal)}</tbody>
          </PlayListTable>
        </>,
      )}
    </>
  );
};

export default MyPlayListBox;
