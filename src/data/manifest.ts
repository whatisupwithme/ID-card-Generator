import type { Manifest, MeterKey } from '../types';

export const superpowers = [
'Ships before the coffee lands',
'Refactors while the wave breaks',
'Debugs by explaining it to a stray dog',
'Turns whiteboards into working demos',
'Reads the stack trace before panicking',
'Names variables like a poet',
'Finds the one missing semicolon',
'Keeps standups under four minutes'];


export const statusLines = [
'Currently: 3 tabs, 1 idea, 0 regrets.',
'Currently: 41 tabs, 1 idea, mild regret.',
'Currently: shipping, sandy, caffeinated.',
'Currently: reviewing a PR from the beach.',
'Currently: one bug away from the sunset.',
'Currently: offline-ish, still deploying.'];


export const meterLabels: Record<MeterKey, string> = {
  ship: 'SHIP VELOCITY',
  caffeine: 'CAFFEINE LEVEL',
  sleep: 'SLEEP DEBT',
  susegad: 'SUSEGAD'
};

export const meterOrder: MeterKey[] = ['ship', 'caffeine', 'sleep', 'susegad'];

export const packingList = [
{ id: 'sunglasses', label: 'Sunglasses' },
{ id: 'patience', label: 'Patience for merge conflicts' },
{ id: 'extension', label: 'Extension cord' },
{ id: 'water', label: 'Water bottle' }];


export const initialManifest: Manifest = {
  superpower: superpowers[0],
  status: statusLines[0],
  meters: { ship: 91, caffeine: 78, sleep: 78, susegad: 82 },
  packed: {
    sunglasses: false,
    patience: true,
    extension: true,
    water: false
  },
  slogan: '4 DAYS. ONE RHYTHM.',
  sloganAccent: 'EVERYTHING INTENTIONAL.'
};

export function randomManifest(current: Manifest): Manifest {
  const pick = (list: string[], avoid: string) => {
    let next = avoid;
    while (next === avoid && list.length > 1) {
      next = list[Math.floor(Math.random() * list.length)];
    }
    return next;
  };
  const jitter = () => 55 + Math.floor(Math.random() * 45);
  return {
    ...current,
    superpower: pick(superpowers, current.superpower),
    status: pick(statusLines, current.status),
    meters: {
      ship: jitter(),
      caffeine: jitter(),
      sleep: jitter(),
      susegad: jitter()
    },
    packed: packingList.reduce<Record<string, boolean>>((acc, item) => {
      acc[item.id] = Math.random() > 0.45;
      return acc;
    }, {})
  };
}