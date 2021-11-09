import { PassThrough } from 'stream';

import { path } from '@ffmpeg-installer/ffmpeg';
import FFmpeg from 'fluent-ffmpeg';
import ytdl from 'ytdl-core';

const streamify = (youtubeId: string) => {
  FFmpeg.setFfmpegPath(path);

  const video = ytdl(`http://youtube.com/watch?v=${youtubeId}`, { quality: 'lowestaudio' });
  const stream = FFmpeg(video).noVideo().format('mp3').stream(new PassThrough());

  return stream as PassThrough;
};

export default streamify;
