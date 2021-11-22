import { Dispatch, MouseEventHandler } from 'react';

import styled from '@emotion/styled';
import router from 'next/router';
import { useDispatch } from 'react-redux';

import { getUser } from '~/actions/user';
import { deletePlaylist } from '~/api/playlist';
import Button from '~/atoms/Button';
import { FAILED, PLAYLIST_EMPTY_MSG } from '~/constants/index';
import theme from '~/styles/theme';
import { Playlist } from '~/types/Playlist';

const EmptyPlayList = styled.tr`
  border: 1px solid ${theme.colors.gray};
  border-width: 1px 0 1px 0;
  color: ${theme.colors.gray};

  > td {
    padding: 8rem 0 !important;
  }
`;
const PlayTitle = styled.h4`
  text-align: left;
  font-size: 1.2rem;
`;
const TableBtnBox = styled.div`
  > button {
    margin-bottom: 0.4rem;
  }
`;

interface Props {
  myPlaylist: Playlist[] | any;
  isMine: boolean;
  openRemoveModal: (id: string) => () => void;
}

const MyPlaylistTable = ({ myPlaylist, isMine, openRemoveModal }: Props) => {
  const dispatch = useDispatch();

  const handleDeletePlaylist =
    (_id: string | undefined, dispatch: Dispatch<any>): MouseEventHandler =>
    async (e) => {
      if (!_id) return;
      const result = await deletePlaylist(_id);
      if (result.status === FAILED) return alert('알 수 없는 오류로 삭제되지 않았습니다.');
      dispatch(getUser());
    };
  const handleUpdatePlaylist =
    (_id: string | undefined): MouseEventHandler =>
    (e) => {
      if (!_id) return;
      router.push(`/playlist/${_id}`);
    };

  return (
    <tbody>
      {!myPlaylist.length ? (
        <EmptyPlayList className="no-result">
          <td colSpan={2}>{PLAYLIST_EMPTY_MSG}</td>
        </EmptyPlayList>
      ) : (
        myPlaylist.map((playlist: Playlist) => (
          <tr key={playlist._id}>
            <td>
              <PlayTitle>{playlist.playlistName}</PlayTitle>
            </td>
            <td>
              <TableBtnBox>
                {isMine && (
                  <Button
                    background={theme.colors.sky}
                    fontSize={'14px'}
                    paddingH={'8px'}
                    width={'100px'}
                    onClick={handleUpdatePlaylist(playlist._id)}
                  >
                    수정
                  </Button>
                )}
                <Button
                  background={theme.colors.peach}
                  fontSize={'14px'}
                  paddingH={'8px'}
                  width={'100px'}
                  onClick={
                    isMine ? handleDeletePlaylist(playlist._id, dispatch) : openRemoveModal(playlist._id as string)
                  }
                >
                  삭제
                </Button>
              </TableBtnBox>
            </td>
          </tr>
        ))
      )}
    </tbody>
  );
};

export default MyPlaylistTable;
