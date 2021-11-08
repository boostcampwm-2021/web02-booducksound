import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import mongoose, { NativeError } from 'mongoose';

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
  myPlaylist: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
  ],
  likes: {
    type: Array,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

UserSchema.pre('save', async function (next) {
  try {
    const user: any = this;
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
    next();
  } catch (err) {
    if (err instanceof NativeError) {
      next(err);
    }
  }
});

UserSchema.pre('updateOne', async function (next) {
  try {
    const user: any = this.getUpdate();
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
    next();
  } catch (err) {
    if (err instanceof NativeError) {
      next(err);
    }
  }
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
