export type Format = 'pfp' | 'id';

export type Offset = {
  x: number;
  y: number;
};

export type GraphicOptions = {
  img: HTMLImageElement | null;
  zoom: number;
  offset: Offset;
  name: string;
  role: string;
  handle: string;
  title: string;
};