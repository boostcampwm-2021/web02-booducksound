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

const PlayListSchema = new Schema({
  playListName: String,
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
  userId: mongoose.Types.ObjectId,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const PlayList = mongoose.model('PlayList', PlayListSchema);

export default PlayList;
