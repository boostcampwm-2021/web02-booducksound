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
  hashtags: [];
  userId: String;
  createdAt: Date;
}

export const getById = async (_id: string) => {
  return Playlist.findById(_id);
};

export const add = (playlistInfo: PlaylistProps) => {
  const newPlaylist = new Playlist({
    ...playlistInfo,
    createAt: new Date(),
  });
  return newPlaylist.save();
};

export const updateById = (_id: string, data: PlaylistProps) => {
  return Playlist.findByIdAndUpdate(_id, data);
};

export const deleteById = (_id: string) => {
  return Playlist.findByIdAndDelete(_id);
};

export const getLegnth = () => {
  return Playlist.count();
};

export const search = (q: string, offset: number, limit: number) => {
  const regex = new RegExp(q, 'i');
  return Playlist.find({ $or: [{ playlistName: regex }, { hashtags: { $in: regex } }] })
    .skip(offset)
    .limit(limit);
};
