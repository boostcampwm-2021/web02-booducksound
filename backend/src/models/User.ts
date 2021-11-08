import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

require('dotenv').config();

const SECRET_KEY: string = process.env.JWT_SECRET || '';
const SALT_ROUNDS = 10;
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  nickname: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
    default: '#fff',
  },
  likes: {
    type: Array,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

UserSchema.pre('save', function (next) {
  // arrow function으로 쓰면 error남 ㅠ
  const user: any = this;
  bcrypt.genSalt(SALT_ROUNDS, (err: Error | undefined, salt: string) => {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, (err: Error | undefined, hash: string) => {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

UserSchema.pre('updateOne', function (next) {
  const user: any = this.getUpdate();
  bcrypt.genSalt(SALT_ROUNDS, (err: Error | undefined, salt: string) => {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, (err: Error | undefined, hash: string) => {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.checkPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

const User = mongoose.model('User', UserSchema);

export default User;
