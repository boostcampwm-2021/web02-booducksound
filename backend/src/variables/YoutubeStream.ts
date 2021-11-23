import fs from 'fs';
import { PassThrough } from 'stream';

import { path } from '@ffmpeg-installer/ffmpeg';
import cloneable from 'cloneable-readable';
import FFmpeg from 'fluent-ffmpeg';
import ytdl from 'ytdl-core';

FFmpeg.setFfmpegPath(path);

class Youtubestream {
  videoId: string;
  mp3Path: string;
  #passThrough?: PassThrough;

  constructor(url: string) {
    this.videoId = this.parseUrl(url);
    this.mp3Path = this.getMp3Path(this.videoId);
    this.#passThrough = this.getPassThrough(this.videoId, this.mp3Path);
  }

  getPassThrough(videoId: string, mp3Path: string) {
    if (!fs.existsSync(`musics`)) fs.mkdirSync('musics');
    if (fs.existsSync(mp3Path) && fs.statSync(mp3Path).size > 0) return;

    const MAX_TIME_LENGTH = 90;
    const passThrough = new PassThrough();
    const writeStream = fs.createWriteStream(mp3Path);
    const video = ytdl(`https://youtube.com/watch?v=${videoId}`, { quality: 'lowestaudio' });
    const ffmpeg = FFmpeg(video);

    ffmpeg.once('error', (error: Error) => {
      passThrough.emit('error', error);
    });

    process.nextTick(() => {
      ffmpeg.noVideo().inputOptions(`-t ${MAX_TIME_LENGTH}`).format('mp3').pipe(passThrough);
      passThrough.pipe(writeStream);
    });

    return passThrough;
  }

  getMp3Path(videoId: string) {
    return `musics/${videoId}.mp3`;
  }

  parseUrl(url: string) {
    const regex = /(.*?)(^|\/|v=)([a-z0-9_-]{11})(.*)?/i;
    return (url.match(regex) as RegExpExecArray)[3];
  }

  get stream() {
    if (this.#passThrough) return cloneable(this.#passThrough);
    return fs.createReadStream(this.mp3Path);
  }
}

export default Youtubestream;
