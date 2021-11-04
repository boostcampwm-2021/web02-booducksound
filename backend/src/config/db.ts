import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const uri = process.env.MONGO_URI ? process.env.MONGO_URI : '';
mongoose
  .connect(uri)
  .then(() => console.log('Successfully connected to mongodb'))
  .catch((e: Error) => console.error(e));

export default mongoose;
