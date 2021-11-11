import { PassThrough } from 'stream';

import { path } from '@ffmpeg-installer/ffmpeg';
import FFmpeg from 'fluent-ffmpeg';
import ytdl from 'ytdl-core';

FFmpeg.setFfmpegPath(path);

const streamify = (url: string) => {
  const video = ytdl(`${url}`, { quality: 'lowestaudio' });
  const stream = FFmpeg(video).noVideo().format('mp3').stream(new PassThrough());

  return stream as PassThrough;
};

export default streamify;
