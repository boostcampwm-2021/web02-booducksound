import { PassThrough } from 'stream';

import { path } from '@ffmpeg-installer/ffmpeg';
import FFmpeg from 'fluent-ffmpeg';
import ytdl from 'ytdl-core';

FFmpeg.setFfmpegPath(path);

class Youtubestream {
  stream: PassThrough;

  constructor(url: string) {
    const MAX_TIME_LENGTH = 90;

    const regex = /(.*?)(^|\/|v=)([a-z0-9_-]{11})(.*)?/i;
    const stream = new PassThrough();
    const videoId = (url.match(regex) as RegExpExecArray)[3];

    const video = ytdl(`https://youtube.com/watch?v=${videoId}`, { quality: 'lowestaudio' });
    const ffmpeg = FFmpeg(video);

    process.nextTick(() => {
      const output = ffmpeg.noVideo().inputOptions(`-t ${MAX_TIME_LENGTH}`).format('mp3').pipe(stream);

      ffmpeg.once('error', (error: Error) => {
        stream.emit('error', error);
      });

      output.once('error', (error: Error) => {
        video.destroy();
        stream.emit('error', error);
      });
    });

    this.stream = stream;
  }

  destroy() {
    this.stream.destroy();
  }
}

export default Youtubestream;
