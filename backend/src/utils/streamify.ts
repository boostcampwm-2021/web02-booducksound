import { PassThrough } from 'stream';

import { path } from '@ffmpeg-installer/ffmpeg';
import FFmpeg from 'fluent-ffmpeg';
import ytdl from 'ytdl-core';

FFmpeg.setFfmpegPath(path);

const streamify = (url: string) => {
  const video = ytdl(`${url}`, { quality: 'lowestaudio' });
  const stream = new PassThrough();
  const ffmpeg = FFmpeg(video);

  process.nextTick(() => {
    const output = ffmpeg.noVideo().format('mp3').pipe(stream);

    ffmpeg.once('error', (error: Error) => stream.emit('error', error));
    output.once('error', (error: Error) => {
      video.destroy();
      stream.emit('error', error);
    });
  });

  return stream;
};

export default streamify;
