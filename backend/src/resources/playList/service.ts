import Playlist from '../../models/Playlist';

interface MusicProps {
  order: Number;
  startPoint: Number;
  destPoint: Number;
  musicURL: String;
  hint: String;
  answers: [];
}
interface PlaylistProps {
  playlistName: String;
  likeCount: Number;
  playCount: Number;
  musics: MusicProps;
  hashTags: [];
  userId: String;
  createdAt: Date;
}

const get = async (_id: string) => {
  return await Playlist.findOne({ _id });
};

const add = (playlistInfo: PlaylistProps) => {
  const newPlaylist = new Playlist({
    ...playlistInfo,
    createAt: new Date(),
  });
  return newPlaylist.save();
};

const update = (_id: string, data: PlaylistProps) => {
  console.log(data);
  return Playlist.updateOne({ _id }, data);
};

const del = (_id: string) => {
  return Playlist.deleteOne({ _id });
};

export default { get, add, update, del };
