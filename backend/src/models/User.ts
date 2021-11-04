import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

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

const User = mongoose.model('User', UserSchema);

export default User;
