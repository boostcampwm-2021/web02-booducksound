import { PassThrough } from 'stream';

import { path } from '@ffmpeg-installer/ffmpeg';
import Ffmpeg from 'fluent-ffmpeg';
import ytdl from 'ytdl-core';

Ffmpeg.setFfmpegPath(path);

class YoutubeStream {
  stream: any;
  output: any;
  video: any;

  constructor(url: string) {
    const regex = /(.*?)(^|\/|v=)([a-z0-9_-]{11})(.*)?/i;
    const videoId = (url.match(regex) as RegExpExecArray)[3];

    this.video = ytdl(`https://youtube.com/watch?v=${videoId}`, { quality: 'lowestaudio' });
    this.stream = new PassThrough();
    const ffmpeg = Ffmpeg(this.video);

    process.nextTick(() => {
      this.output = ffmpeg.noVideo().format('mp3').pipe(this.stream);

      ffmpeg.once('error', (error: Error) => this.stream.emit('error', error));
      this.output.once('error', (error: Error) => {
        this.video.destroy();
        this.stream.emit('error', error);
      });
    });
  }

  destroy() {
    this.stream.destroy();
    this.video.destroy();
    this.output.destroy();
  }
}

export default YoutubeStream;
