interface ImageLoader {
  url: string;
  src: string;
  width: number;
  quality?: number;
}
export default function ImageLoader({ url, src, width, quality }: ImageLoader) {
  return `${url}/${src}?w=${width}&q=${quality || 75}`;
}
