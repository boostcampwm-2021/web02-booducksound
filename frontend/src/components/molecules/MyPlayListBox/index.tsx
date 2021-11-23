import BoxTitle from '~/atoms/BoxTitle';
import PlayListTable from '~/atoms/PlayListTable';
import MyPlaylistTable from '~/organisms/MyPlaylistTable';
import { Playlist } from '~/types/Playlist';

type Info = {
  id: string;
  likes: any;
  myPlaylist: Playlist[];
};

type Props = {
  info: Info;
  openRemoveModal: (id: string) => () => void;
};

const MyPlayListBox = ({ info, openRemoveModal }: Props) => {
  const { likes, myPlaylist } = info;
  return (
    <>
      <BoxTitle num={myPlaylist?.length}>내가 작성한 플레이리스트</BoxTitle>
      <PlayListTable>
        <colgroup>
          <col width="100%" />
          <col width="*" />
        </colgroup>
        <MyPlaylistTable
          myPlaylist={myPlaylist || []}
          isMine={true}
          openRemoveModal={openRemoveModal}
        ></MyPlaylistTable>
      </PlayListTable>
      <BoxTitle num={likes?.length}>내가 좋아요한 플레이리스트</BoxTitle>
      <PlayListTable>
        <colgroup>
          <col width="100%" />
          <col width="*" />
        </colgroup>
        <MyPlaylistTable myPlaylist={likes || []} isMine={false} openRemoveModal={openRemoveModal}></MyPlaylistTable>
      </PlayListTable>
    </>
  );
};

export default MyPlayListBox;
