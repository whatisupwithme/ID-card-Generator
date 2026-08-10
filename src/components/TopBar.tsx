import React from 'react';
import { ModeToggle } from './ModeToggle';
import type { Mode } from '../types';

type Props = {
  mode: Mode;
  onModeChange: (mode: Mode) => void;
  step: 1 | 2 | 3;
};

const STEPS = [
{ n: 1 as const, label: 'PHOTO' },
{ n: 2 as const, label: 'STYLE' },
{ n: 3 as const, label: 'SHARE' }];


export function TopBar({ mode, onModeChange, step }: Props) {
  return (
    <header className="flex flex-wrap items-center justify-between gap-3">
      <div className="min-w-0">
        <p className="font-mono text-[10px] tracking-[0.32em] text-pop">
          GOA, INDIA · 28–31 OCT 2026
        </p>
        <h1 className="font-display text-3xl leading-none text-ink sm:text-4xl">
          FRAME IN <span className="text-accent">GOA</span>
        </h1>
      </div>

      <ol className="hidden items-center gap-1.5 md:flex" aria-label="Progress">
        {STEPS.map((s) => {
          const active = s.n === step;
          const done = s.n < step;
          return (
            <li key={s.n}>
              <span
                aria-current={active ? 'step' : undefined}
                className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 font-mono text-[10px] font-semibold tracking-[0.2em] transition ${
                active ?
                'border-accent bg-accent text-accentInk' :
                done ?
                'border-line text-ink' :
                'border-line text-inkSoft'}`
                }>
                
                <span aria-hidden="true">0{s.n}</span>
                {s.label}
              </span>
            </li>);

        })}
      </ol>

      <div className="flex items-center gap-2">
        <span className="hidden rounded-full border border-line px-3 py-1.5 font-mono text-[10px] tracking-[0.2em] text-inkSoft sm:inline-block">
          NOTHING LEAVES YOUR DEVICE
        </span>
        <ModeToggle mode={mode} onChange={onModeChange} />
      </div>
    </header>);

}