import { Dispatch, MouseEventHandler } from 'react';

import styled from '@emotion/styled';
import router from 'next/router';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import { getUser } from '~/actions/user';
import { deletePlaylist } from '~/api/playlist';
import Button from '~/atoms/Button';
import { FAILED, PLAYLIST_DELETE_ERR_MSG, PLAYLIST_EMPTY_MSG, TOAST_OPTION } from '~/constants/index';
import theme from '~/styles/theme';
import { Playlist } from '~/types/Playlist';

const EmptyPlayList = styled.tr`
  border: 1px solid ${({ theme }) => theme.colors.gray};
  border-width: 1px 0 1px 0;
  color: ${({ theme }) => theme.colors.gray};

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
      if (result.status === FAILED) return toast.error(PLAYLIST_DELETE_ERR_MSG, TOAST_OPTION);
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
                    fontSize="14px"
                    paddingH="8px"
                    width="100px"
                    onClick={handleUpdatePlaylist(playlist._id)}
                  >
                    수정
                  </Button>
                )}
                <Button
                  background={theme.colors.peach}
                  fontSize="14px"
                  paddingH="8px"
                  width="100px"
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
