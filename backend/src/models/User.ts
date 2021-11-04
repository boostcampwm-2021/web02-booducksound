import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: String,
  login: String,
  pwd: String,
  likes: Array,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const User = mongoose.model('User', UserSchema);

export default User;
