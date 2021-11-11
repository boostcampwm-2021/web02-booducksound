import mongoose from 'mongoose';

const URI = process.env.MONGO_URI as string;

mongoose.connect(URI, {});

const db = mongoose.connection;

db.once('open', () => console.log('mongoose connected'));
db.on('error', (error) => console.error('DB Error', error));
