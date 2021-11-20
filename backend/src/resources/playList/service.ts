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
  return Playlist.updateOne({ _id }, data);
};

export const deleteById = (_id: string) => {
  return Playlist.deleteOne({ _id });
};

export const getLength = () => {
  return Playlist.count();
};

export const search = (q: string, offset: number, limit: number) => {
  const regex = new RegExp(q, 'i');
  return Playlist.find({ $or: [{ playlistName: regex }, { hashtags: { $in: regex } }] })
    .sort({ playCount: -1, likeCount: -1 })
    .skip(offset)
    .limit(limit);
};

export const incrementPlayCount = async (_id: string) => {
  await Playlist.updateOne({ _id }, { $inc: { playCount: 1 } });
};

export const incrementLikeCount = async (_id: string) => {
  await Playlist.updateOne({ _id }, { $inc: { likeCount: 1 } });
};

export const decrementLikeCount = async (_id: string) => {
  await Playlist.updateOne({ _id }, { $inc: { likeCount: -1 } });
};
