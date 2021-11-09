import Playlist from '../../models/PlayList';
import User from '../../models/User';

const changeColor = async (id: string, color: string) => {
  await User.updateOne({ id }, { color });
};

const getMyPlaylist = async (_id: string) => {
  const idList = JSON.parse(_id);
  const play = await Playlist.find({ _id: idList });
  return play;
};

const deleteLikes = async (id: string, _id: string) => {
  await User.updateOne({ id }, { $pull: { likes: _id } });
};

export default {
  changeColor,
  getMyPlaylist,
  deleteLikes,
};
