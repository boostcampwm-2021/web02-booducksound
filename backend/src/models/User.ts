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
  bcrypt.genSalt(SALT_ROUNDS, (err: any, salt: string) => {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, (err: any, hash: string) => {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

UserSchema.pre('updateOne', function (next) {
  const user: any = this.getUpdate();
  bcrypt.genSalt(SALT_ROUNDS, (err: any, salt: string) => {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, (err: any, hash: string) => {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.checkPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

UserSchema.statics.findByToken = function (token) {
  const user: any = this;
  const decoded = jwt.verify(token, SECRET_KEY);
  /*
  return jwt.verify(token, 'secretToken', (err: any, decoded: string) => {
    return user
      .findOne({id: decoded, token })
      .then((user) => user)
      .catch((_err) => _err);
  });
  */
};

const User = mongoose.model('User', UserSchema);

export default User;
