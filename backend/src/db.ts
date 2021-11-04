import mongoose from 'mongoose';

const URI = process.env.MONGO_URI || '';

mongoose.connect(URI, {});

const db = mongoose.connection;

db.once('open', () => console.log('mongoose connected'));
db.on('error', (error) => console.log('DB Error', error));
