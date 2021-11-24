import fs from 'fs';
import { PassThrough } from 'stream';

import cloneable from 'cloneable-readable';
import ytdl from 'ytdl-core';

class Youtubestream {
  videoId: string;
  mp3Path: string;
  #passThrough?: PassThrough;

  constructor(url: string) {
    this.videoId = this.#parseUrl(url);
    this.mp3Path = this.#getMp3Path(this.videoId);
    this.#passThrough = this.#getPassThrough(this.videoId, this.mp3Path);
  }

  get stream() {
    if (this.#passThrough) return cloneable(this.#passThrough);
    return fs.createReadStream(this.mp3Path);
  }

  #getPassThrough(videoId: string, mp3Path: string) {
    const MAX_FILE_BYTE = 2 ** 20;
    const NEED_FILE_BYTE = 2 ** 10;

    if (!fs.existsSync(`musics`)) fs.mkdirSync('musics');
    if (fs.existsSync(mp3Path) && fs.statSync(mp3Path).size > NEED_FILE_BYTE) return;

    const passThrough = new PassThrough();
    const writeStream = fs.createWriteStream(mp3Path);
    const video = ytdl(`https://youtube.com/watch?v=${videoId}`, { quality: 'lowestaudio' });

    video.pipe(passThrough);
    passThrough.pipe(writeStream);

    writeStream.on('drain', () => {
      if (fs.statSync(mp3Path).size < MAX_FILE_BYTE) return;
      video.pause();
      writeStream.close();
    });

    return passThrough;
  }

  #getMp3Path(videoId: string) {
    return `musics/${videoId}.mp3`;
  }

  #parseUrl(url: string) {
    const regex = /(.*?)(^|\/|v=)([a-z0-9_-]{11})(.*)?/i;
    return (url.match(regex) as RegExpExecArray)[3];
  }
}

export default Youtubestream;
