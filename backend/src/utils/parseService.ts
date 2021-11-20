export class ParserService {
  parseVideo(data: any) {
    if (!data || !data.videoRenderer) return;
    let title = '';
    try {
      title = data.videoRenderer.title.runs[0].text;
      title = title.replace('\\\\', '\\');
      try {
        title = decodeURIComponent(title);
      } catch (e) {
        // @ts-ignore
      }

      return {
        id: {
          videoId: data.videoRenderer.videoId,
        },
        url: `https://www.youtube.com/watch?v=${data.videoRenderer.videoId}`,
        title,
        thumbnails: {
          id: data.videoRenderer.videoId,
          url: data.videoRenderer.thumbnail.thumbnails[data.videoRenderer.thumbnail.thumbnails.length - 1].url,
        },
      };
    } catch (e) {
      return undefined;
    }
  }
}
