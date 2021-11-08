import PlayList from '../../models/PlayList';

interface PlayListProps {
  playListName: String;
  likeCount: Number;
  playCount: Number;
  musics: MusicProps;
  hashTags: [];
  UserId: String;
  createdAt: Date;
}

interface MusicProps {
  order: Number;
  startPoint: Number;
  destPoint: Number;
  musicURL: String;
  hint: String;
  answers: [];
}

// const get = (req) => {};

const add = ({ playListName, musics, hashTags, UserId }: PlayListProps) => {
  const newPlayList = new PlayList({
    playListName,
    musics,
    hashTags,
    UserId,
    createAt: new Date(),
  });
  return newPlayList.save();
};

const modify = (_id: string, data: PlayListProps) => {
  console.log(data);
  return PlayList.updateOne({ _id }, data);
};

const del = (_id: string) => {
  return PlayList.deleteOne({ _id });
};

export default { add, modify, del };
