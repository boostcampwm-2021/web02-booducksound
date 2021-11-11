import { PassThrough } from 'stream';
import { URL } from 'url';

import { path } from '@ffmpeg-installer/ffmpeg';
import FFmpeg from 'fluent-ffmpeg';
import ytdl from 'ytdl-core';

FFmpeg.setFfmpegPath(path);

const streamify = (url: string) => {
  const regex = /(.*?)(^|\/|v=)([a-z0-9_-]{11})(.*)?/i;
  const videoId = (url.match(regex) as RegExpExecArray)[3];

  const video = ytdl(`https://youtube.com/watch?v=${videoId}`, { quality: 'lowestaudio' });
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
