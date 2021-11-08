import http from 'http';

import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import morgan from 'morgan';

import io from './io';
import accRouter from './resources/account/router';
import playListRouter from './resources/playList/router';

const app = express();

app.use(cors({ credentials: true, origin: ['http://localhost:7000', 'http://27.96.131.89'] }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(morgan('common'));

app.use('/assets', express.static('assets'));
app.use('/playList', playlistRouter);
app.use('/', accRouter);
app.get('/', (req, res) => {
  res.send('Hello World!');
});

const server = http.createServer(app);

io.attach(server, {
  cors: {
    credentials: true,
    origin: ['http://localhost:7000', 'http://27.96.131.89'],
  },
});

export default server;
