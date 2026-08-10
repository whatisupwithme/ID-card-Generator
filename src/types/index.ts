export type Format = 'pfp' | 'id';

export type Orientation = 'landscape' | 'portrait';

export type Side = 'front' | 'back';

export type Mode = 'light' | 'dark';

export type Offset = {
  x: number;
  y: number;
};

export type MeterKey = 'ship' | 'caffeine' | 'sleep' | 'susegad';

export type Manifest = {
  superpower: string;
  status: string;
  meters: Record<MeterKey, number>;
  packed: Record<string, boolean>;
  slogan: string;
  sloganAccent: string;
};

export type GraphicOptions = {
  img: HTMLImageElement | null;
  zoom: number;
  offset: Offset;
  name: string;
  role: string;
  handle: string;
  title: string;
  themeId: string;
  trimId: string;
  manifest: Manifest;
};