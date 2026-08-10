export type TrimKind = 'ornament' | 'dotted' | 'rope' | 'rays';

export type FrameTrim = {
  id: TrimKind;
  label: string;
  hint: string;
};

export type CardPalette = {
  paper: string;
  ink: string;
  inkSoft: string;
  label: string;
  rule: string;
  headerBg: string;
  headerInk: string;
  headerMeta: string;
  footerBg: string;
  footerInk: string;
  panelBg: string;
  panelInk: string;
  panelAccent: string;
  meterTrack: string;
};

export type FrameTheme = {
  id: string;
  label: string;
  blurb: string;
  sky: string;
  skyBand: string;
  disc: string;
  ring: string;
  scene: string;
  sceneDeep: string;
  sand: string;
  sea: string;
  orb: string;
  orbGlow: string;
  ink: string;
  inkSoft: string;
  bandInk: string;
  accent: string;
  accentInk: string;
  pop: string;
  popInk: string;
  stars: boolean;
  swatches: [string, string, string];
  card: CardPalette;
};

const goaCard: CardPalette = {
  paper: '#F6E9C6',
  ink: '#0B3D28',
  inkSoft: '#4C6B58',
  label: '#CE0F5D',
  rule: 'rgba(11,61,40,0.22)',
  headerBg: '#0B3D28',
  headerInk: '#F6E9C6',
  headerMeta: '#FFD21E',
  footerBg: '#F0186B',
  footerInk: '#FFF3D6',
  panelBg: '#0B3D28',
  panelInk: '#F6E9C6',
  panelAccent: '#FFD21E',
  meterTrack: 'rgba(11,61,40,0.16)'
};

export const frameThemes: FrameTheme[] = [
{
  id: 'susegad',
  label: 'Susegad Green',
  blurb: 'House green, yellow ring, midday palms.',
  sky: '#083A25',
  skyBand: '#0B4A2F',
  disc: '#04281A',
  ring: '#FFD21E',
  scene: '#127A4C',
  sceneDeep: '#0A5836',
  sand: '#1B8B5A',
  sea: '#106E45',
  orb: '#FFD21E',
  orbGlow: 'rgba(255,210,30,0.22)',
  ink: '#F6E9C6',
  inkSoft: 'rgba(246,233,198,0.72)',
  bandInk: '#F6E9C6',
  accent: '#FFD21E',
  accentInk: '#06301F',
  pop: '#F0186B',
  popInk: '#FFF3D6',
  stars: false,
  swatches: ['#0B4A2F', '#FFD21E', '#F0186B'],
  card: goaCard
},
{
  id: 'nightshift',
  label: 'Night Shift',
  blurb: 'Deep navy, cyan ring, star field.',
  sky: '#0A1836',
  skyBand: '#122551',
  disc: '#050D22',
  ring: '#5CC8F7',
  scene: '#16305F',
  sceneDeep: '#0D1E42',
  sand: '#1B3A6C',
  sea: '#122A55',
  orb: '#E9F2FF',
  orbGlow: 'rgba(233,242,255,0.18)',
  ink: '#EAF2FF',
  inkSoft: 'rgba(234,242,255,0.7)',
  bandInk: '#EAF2FF',
  accent: '#5CC8F7',
  accentInk: '#06203B',
  pop: '#FF3383',
  popInk: '#08142B',
  stars: true,
  swatches: ['#122551', '#5CC8F7', '#FF3383'],
  card: {
    ...goaCard,
    label: '#123F7E',
    headerBg: '#122551',
    panelBg: '#0D1E42',
    panelAccent: '#5CC8F7',
    footerBg: '#FF3383',
    footerInk: '#08142B'
  }
},
{
  id: 'sundowner',
  label: 'Sundowner',
  blurb: 'Dusk plum, warm apricot ring.',
  sky: '#3F1442',
  skyBand: '#6B1F4C',
  disc: '#2A0E2B',
  ring: '#FFB067',
  scene: '#7A2544',
  sceneDeep: '#4C1533',
  sand: '#B8434A',
  sea: '#8E2C4B',
  orb: '#FF8A3D',
  orbGlow: 'rgba(255,138,61,0.24)',
  ink: '#FFE9D6',
  inkSoft: 'rgba(255,233,214,0.72)',
  bandInk: '#FFE9D6',
  accent: '#FFB067',
  accentInk: '#3A1024',
  pop: '#FF2E80',
  popInk: '#3A1024',
  stars: true,
  swatches: ['#6B1F4C', '#FFB067', '#FF2E80'],
  card: {
    ...goaCard,
    label: '#A4185A',
    headerBg: '#4C1533',
    panelBg: '#4C1533',
    panelAccent: '#FFB067',
    footerBg: '#FF2E80',
    footerInk: '#3A1024'
  }
},
{
  id: 'beachday',
  label: 'Beach Day',
  blurb: 'Cream paper, green ink, printed feel.',
  sky: '#F7EBCB',
  skyBand: '#F1DFB0',
  disc: '#0B4A2F',
  ring: '#0B4A2F',
  scene: '#1A8F57',
  sceneDeep: '#0B4A2F',
  sand: '#E8D49B',
  sea: '#7FC7A2',
  orb: '#FFD21E',
  orbGlow: 'rgba(255,210,30,0.4)',
  ink: '#0B3D28',
  inkSoft: 'rgba(11,61,40,0.7)',
  bandInk: '#F6E9C6',
  accent: '#0B4A2F',
  accentInk: '#F6E9C6',
  pop: '#F0186B',
  popInk: '#FFF3D6',
  stars: false,
  swatches: ['#F1DFB0', '#0B4A2F', '#F0186B'],
  card: goaCard
}];


export const frameTrims: FrameTrim[] = [
{ id: 'ornament', label: 'Goa Border', hint: 'Block-print floral band' },
{ id: 'dotted', label: 'Dot Trim', hint: 'Dashed ring, clean' },
{ id: 'rope', label: 'Rope Ring', hint: 'Twin ring with ticks' },
{ id: 'rays', label: 'Sun Rays', hint: 'Radial burst edge' }];


export function getTheme(id: string): FrameTheme {
  return frameThemes.find((t) => t.id === id) ?? frameThemes[0];
}

export function getTrim(id: string): FrameTrim {
  return frameTrims.find((t) => t.id === id) ?? frameTrims[0];
}