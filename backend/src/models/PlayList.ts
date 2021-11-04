import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const PlayListSchema = new Schema({
  playListName: String,
  likeCount: Number,
  playCount: Number,
  musics: {
    order: Number,
    startPoint: Number,
    destPoint: Number,
    musicURL: String,
    hint: String,
    answers: Array,
  },
  hashTags: Array,
  userId: mongoose.Types.ObjectId,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const PlayList = mongoose.model('PlayList', PlayListSchema);

export default PlayList;
