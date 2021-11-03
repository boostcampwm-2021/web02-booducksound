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

const Users = mongoose.model('Users', UserSchema);

module.exports = Users;
