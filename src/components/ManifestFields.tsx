import React from 'react';
import { CheckIcon, DicesIcon, ShuffleIcon } from 'lucide-react';
import { TextField } from './ui/TextField';
import { SectionLabel } from './ui/SectionLabel';
import { meterLabels, meterOrder, packingList } from '../data/manifest';
import type { Manifest, MeterKey } from '../types';

type Props = {
  manifest: Manifest;
  onChange: (patch: Partial<Manifest>) => void;
  onShuffleSuperpower: () => void;
  onShuffleStatus: () => void;
  onRandomize: () => void;
};

/** Everything that lives on the back of the badge — all of it live-editable. */
export function ManifestFields({
  manifest,
  onChange,
  onShuffleSuperpower,
  onShuffleStatus,
  onRandomize
}: Props) {
  const setMeter = (key: MeterKey, value: number) =>
  onChange({ meters: { ...manifest.meters, [key]: value } });

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-2">
        <SectionLabel>BUILDER MANIFEST</SectionLabel>
        <button
          type="button"
          onClick={onRandomize}
          className="inline-flex items-center gap-1.5 rounded-full border border-line px-2.5 py-1 font-mono text-[10px] font-semibold tracking-[0.14em] text-ink transition hover:border-accent">
          
          <DicesIcon className="h-3.5 w-3.5" aria-hidden="true" />
          SURPRISE ME
        </button>
      </div>

      <TextField
        id="superpower"
        label="SUPERPOWER"
        value={manifest.superpower}
        maxLength={40}
        placeholder="Ships before the coffee lands"
        onChange={(superpower) => onChange({ superpower })}
        action={
        <button
          type="button"
          onClick={onShuffleSuperpower}
          aria-label="Suggest another superpower"
          className="shrink-0 rounded-xl border border-line px-3 text-ink transition hover:border-accent">
          
            <ShuffleIcon className="h-4 w-4" aria-hidden="true" />
          </button>
        } />
      

      <TextField
        id="status"
        label="CURRENT STATUS"
        value={manifest.status}
        maxLength={48}
        placeholder="Currently: 3 tabs, 1 idea, 0 regrets."
        onChange={(status) => onChange({ status })}
        action={
        <button
          type="button"
          onClick={onShuffleStatus}
          aria-label="Suggest another status line"
          className="shrink-0 rounded-xl border border-line px-3 text-ink transition hover:border-accent">
          
            <ShuffleIcon className="h-4 w-4" aria-hidden="true" />
          </button>
        } />
      

      <div>
        <SectionLabel>BUILD-O-METER</SectionLabel>
        <div className="mt-2 space-y-2">
          {meterOrder.map((key) =>
          <div key={key}>
              <div className="flex items-center justify-between">
                <label
                htmlFor={`meter-${key}`}
                className="font-mono text-[10px] tracking-[0.14em] text-inkSoft">
                
                  {meterLabels[key]}
                </label>
                <span className="font-mono text-[10px] font-semibold text-pop">
                  {manifest.meters[key]}%
                </span>
              </div>
              <input
              id={`meter-${key}`}
              type="range"
              min={0}
              max={100}
              step={1}
              value={manifest.meters[key]}
              onChange={(e) => setMeter(key, Number(e.target.value))}
              className="goa-range mt-1" />
            
            </div>
          )}
        </div>
      </div>

      <div>
        <SectionLabel>PACKED FOR GOA</SectionLabel>
        <div className="mt-2 grid gap-1.5">
          {packingList.map((item) => {
            const checked = Boolean(manifest.packed[item.id]);
            return (
              <button
                key={item.id}
                type="button"
                role="checkbox"
                aria-checked={checked}
                onClick={() =>
                onChange({
                  packed: { ...manifest.packed, [item.id]: !checked }
                })
                }
                className={`flex items-center gap-2 rounded-xl border px-2.5 py-2 text-left transition ${
                checked ?
                'border-accent bg-panelAlt' :
                'border-line hover:border-accent'}`
                }>
                
                <span
                  aria-hidden="true"
                  className={`grid h-4 w-4 shrink-0 place-items-center rounded border ${
                  checked ? 'border-pop bg-pop' : 'border-line'}`
                  }>
                  
                  {checked ?
                  <CheckIcon className="h-3 w-3 text-popInk" /> :
                  null}
                </span>
                <span className="font-mono text-[11px] text-ink">
                  {item.label}
                </span>
              </button>);

          })}
        </div>
      </div>

      <TextField
        id="slogan"
        label="BADGE SLOGAN"
        value={manifest.slogan}
        maxLength={26}
        placeholder="4 DAYS. ONE RHYTHM."
        onChange={(slogan) => onChange({ slogan })} />
      
      <TextField
        id="slogan-accent"
        label="SLOGAN KICKER"
        value={manifest.sloganAccent}
        maxLength={26}
        placeholder="EVERYTHING INTENTIONAL."
        onChange={(sloganAccent) => onChange({ sloganAccent })} />
      
    </div>);

}