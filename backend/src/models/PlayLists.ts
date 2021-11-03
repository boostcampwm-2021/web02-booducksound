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
  userId: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const PlayLists = mongoose.model('PlayLists', PlayListSchema);

module.exports = PlayLists;
