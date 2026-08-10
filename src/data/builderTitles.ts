export const builderTitles = [
'Midnight Shipper',
'Susegad Systems Architect',
'Feni-Fuelled Debugger',
'Beach Bum Backend Wizard',
'Prompt Whisperer',
'Latency Slayer',
'Deploy-On-Friday Menace',
'Pixel Perfectionist',
'Chai Powered Refactorer',
'Monsoon Merge Conflict Survivor',
'Zero-To-One Operator',
'Terminal Room Nocturnal',
'Vibe Architect',
'Edge Case Hunter',
'Serverless Sunseeker',
'Ship Fast Repeat Cultist'];


export function pickBuilderTitle(seed: string): string {
  let hash = 7;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) % 100000;
  }
  return builderTitles[hash % builderTitles.length];
}

export function badgeId(seed: string): string {
  let hash = 11;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 17 + seed.charCodeAt(i)) % 9999;
  }
  return `HHG26-${String(hash).padStart(4, '0')}`;
}