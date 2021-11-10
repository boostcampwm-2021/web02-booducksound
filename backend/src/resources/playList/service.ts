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

export const get = async (_id: string) => {
  return await Playlist.findOne({ _id });
};

export const add = (playlistInfo: PlaylistProps) => {
  const newPlaylist = new Playlist({
    ...playlistInfo,
    createAt: new Date(),
  });
  return newPlaylist.save();
};

export const update = (_id: string, data: PlaylistProps) => {
  console.log(data);
  return Playlist.updateOne({ _id }, data);
};

export const del = (_id: string) => {
  return Playlist.deleteOne({ _id });
};
