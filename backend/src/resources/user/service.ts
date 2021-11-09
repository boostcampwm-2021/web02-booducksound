import mongoose from 'mongoose';

import Playlist from '../../models/Playlist';
import User from '../../models/User';

const changeColor = async (id: string, color: string) => {
  await User.updateOne({ id }, { color });
};

const getMyPlaylist = async (_id: string) => {
  const idList = JSON.parse(_id);
  const play = await Playlist.find({ _id: idList });
  return play;
};

const postMyPlaylist = async (userId: string, playlistId: mongoose.Types.ObjectId) => {
  await User.findOneAndUpdate(
    {
      id: userId,
    },
    { $push: { myPlaylist: playlistId } },
  );
};

const deleteLikes = async (id: string, _id: mongoose.Types.ObjectId) => {
  await User.findOneAndUpdate({ id }, { $pull: { likes: _id } }, { new: true });
};

export default {
  changeColor,
  getMyPlaylist,
  deleteLikes,
  postMyPlaylist,
};
