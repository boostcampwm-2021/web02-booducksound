import http from 'http';

import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';

import db from './config/db';
import io from './io';
import userRouter from './resources/user/router';

dotenv.config();

const PORT = 5000;
const app = express();
db;
app.use(cors({ credentials: true, origin: 'http://localhost:7000' }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(morgan('common'));

app.use('/assets', express.static('assets'));
app.use('/user', userRouter);
app.get('/', (req, res) => {
  res.send('Hello World!');
});

const server = http.createServer(app);

io.attach(server, {
  cors: {
    credentials: true,
    origin: ['http://localhost:7000'],
  },
});

server.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
