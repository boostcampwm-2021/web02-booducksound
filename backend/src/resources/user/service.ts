import Playlist from '../../models/PlayList';
import User from '../../models/User';

const changeColor = async (id: string, color: string) => {
  await User.update({ id }, { color });
};

const getMyPlaylist = async (_id: string) => {
  const idList = JSON.parse(_id);
  const play = await Playlist.find({ _id: idList });
  return play;
};

export default {
  changeColor,
  getMyPlaylist,
};
