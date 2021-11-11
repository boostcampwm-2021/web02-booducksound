import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const MusicSchema = new Schema({
  info: { type: String, maxlength: 50 },
  hint: { type: String, maxlength: 50 },
  url: { type: String, maxlength: 200 },
  answers: [{ type: String, maxlength: 50 }],
});

const PlaylistSchema = new Schema({
  playlistName: { type: String, maxlength: 50 },
  description: { type: String, maxlength: 100 },
  likeCount: { type: Number, default: 0 },
  playCount: { type: Number, default: 0 },
  musics: [MusicSchema],
  hashtags: [{ type: String, maxlength: 30 }],
  userId: { type: String, maxlength: 20 },
  createdAt: { type: Date, default: new Date() },
});

const Playlist = mongoose.models.Playlist || mongoose.model('Playlist', PlaylistSchema);

export default Playlist;
