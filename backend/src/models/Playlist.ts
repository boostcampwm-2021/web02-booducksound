import mongoose from 'mongoose';

const Schema = mongoose.Schema;

interface Props {
  order: Number;
  startPoint: Number;
  destPoint: Number;
  musicURL: String;
  hint: String;
  answers: [];
}

const PlaylistSchema = new Schema({
  playlistName: String,
  description: String,
  likeCount: {
    type: Number,
    default: 0,
  },
  playCount: {
    type: Number,
    default: 0,
  },
  musics: Array,
  hashTags: Array,
  userId: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const Playlist = mongoose.models.Playlist || mongoose.model('Playlist', PlaylistSchema);

export default Playlist;
