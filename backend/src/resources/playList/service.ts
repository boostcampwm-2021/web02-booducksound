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
  PlaylistName: String;
  likeCount: Number;
  playCount: Number;
  musics: MusicProps;
  hashTags: [];
  UserId: String;
  createdAt: Date;
}

// const get = (req) => {};

const add = ({ PlaylistName, musics, hashTags, UserId }: PlaylistProps) => {
  const newPlaylist = new Playlist({
    PlaylistName,
    musics,
    hashTags,
    UserId,
    createAt: new Date(),
  });
  return newPlaylist.save();
};

const modify = (_id: string, data: PlaylistProps) => {
  console.log(data);
  return Playlist.updateOne({ _id }, data);
};

const del = (_id: string) => {
  return Playlist.deleteOne({ _id });
};

export default { add, modify, del };
