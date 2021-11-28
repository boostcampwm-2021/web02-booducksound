import mongoose from 'mongoose';

import Playlist from '~/models/Playlist';
import User from '~/models/User';

export const changeColor = async (id: string, color: string) => {
  await User.updateOne({ id }, { color });
};

export const getMyPlaylist = async (_id: string) => {
  const idList = JSON.parse(_id);
  const play = await Playlist.find({ _id: idList });
  return play;
};

export const postMyPlaylist = async (userId: string, playlistId: mongoose.Types.ObjectId) => {
  await User.findOneAndUpdate({ id: userId }, { $push: { myPlaylist: playlistId } });
};

export const insertLikes = async (id: string, playlistId: string) => {
  await User.updateOne({ id }, { $addToSet: { likes: playlistId } });
};

export const deleteLikes = async (id: string, _id: string) => {
  await User.updateOne({ id }, { $pull: { likes: _id } }, { new: true });
};
