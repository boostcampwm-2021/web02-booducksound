import { PassThrough } from 'stream';

import { path } from '@ffmpeg-installer/ffmpeg';
import FFmpeg from 'fluent-ffmpeg';
import ytdl from 'ytdl-core';

const streamify = (youtubeId: string) => {
  FFmpeg.setFfmpegPath(path);

  const video = ytdl(`http://youtube.com/watch?v=${youtubeId}`, { quality: 'lowestaudio' });
  const stream = new PassThrough();
  const ffmpeg = FFmpeg(video);

  process.nextTick(() => {
    const output = ffmpeg.format('mp3').pipe(stream);

    ffmpeg.once('error', (error) => stream.emit('error', error));
    output.once('error', (error) => {
      video.destroy();
      stream.emit('error', error);
    });
  });

  return stream;
};

export default streamify;
