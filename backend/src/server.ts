import http from 'http';

import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import morgan from 'morgan';

import sockets from './sockets';

import accRouter from '~/resources/account/router';
import gameRouter from '~/resources/game/router';
import playListRouter from '~/resources/playList/router';
import userRouter from '~/resources/user/router';

const app = express();

const LOCALHOST = process.env.LOCALHOST as string;
const PRODUCTION = process.env.PRODUCTION as string;
const DOMAIN_NAME = process.env.DOMAIN_NAME as string;

app.use(cors({ credentials: true, origin: [LOCALHOST, PRODUCTION, DOMAIN_NAME] }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(morgan('common'));

app.use('/assets', express.static('assets'));
app.use('/', accRouter);
app.use('/playList', playListRouter);
app.use('/user', userRouter);
app.use('/game', gameRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const server = http.createServer(app);

sockets.attach(server, {
  cors: {
    credentials: true,
    origin: [LOCALHOST, PRODUCTION, DOMAIN_NAME],
  },
});

export default server;
