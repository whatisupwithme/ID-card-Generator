import React from 'react';
import { CheckIcon } from 'lucide-react';
import { frameThemes, frameTrims } from '../data/frameThemes';
import type { TrimKind } from '../data/frameThemes';
import { SectionLabel } from './ui/SectionLabel';

type Props = {
  themeId: string;
  trimId: string;
  onThemeChange: (id: string) => void;
  onTrimChange: (id: TrimKind) => void;
};

function TrimGlyph({ kind }: {kind: TrimKind;}) {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" aria-hidden="true">
      {kind === 'ornament' ?
      <>
          <circle
          cx="13"
          cy="13"
          r="10"
          fill="none"
          stroke="#0E5B34"
          strokeWidth="5" />
        
          {[0, 60, 120, 180, 240, 300].map((a) =>
        <circle
          key={a}
          cx={13 + Math.cos(a * Math.PI / 180) * 10}
          cy={13 + Math.sin(a * Math.PI / 180) * 10}
          r="2.1"
          fill="#A6D96A" />

        )}
          {[30, 150, 270].map((a) =>
        <circle
          key={a}
          cx={13 + Math.cos(a * Math.PI / 180) * 10}
          cy={13 + Math.sin(a * Math.PI / 180) * 10}
          r="1.6"
          fill="#F0186B" />

        )}
        </> :
      null}
      {kind === 'dotted' ?
      <circle
        cx="13"
        cy="13"
        r="10"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeDasharray="2 5"
        strokeLinecap="round" /> :

      null}
      {kind === 'rope' ?
      <>
          <circle
          cx="13"
          cy="13"
          r="11"
          fill="none"
          stroke="currentColor"
          strokeWidth="2" />
        
          <circle
          cx="13"
          cy="13"
          r="7"
          fill="none"
          stroke="currentColor"
          strokeWidth="2" />
        
        </> :
      null}
      {kind === 'rays' ?
      <>
          <circle
          cx="13"
          cy="13"
          r="6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2" />
        
          {Array.from({ length: 12 }).map((_, i) => {
          const a = i / 12 * Math.PI * 2;
          return (
            <line
              key={i}
              x1={13 + Math.cos(a) * 8}
              y1={13 + Math.sin(a) * 8}
              x2={13 + Math.cos(a) * 12}
              y2={13 + Math.sin(a) * 12}
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round" />);


        })}
        </> :
      null}
    </svg>);

}

/** Frame themes plus the trim choice available inside every theme. */
export function ThemePicker({
  themeId,
  trimId,
  onThemeChange,
  onTrimChange
}: Props) {
  return (
    <div className="space-y-3">
      <div>
        <SectionLabel>FRAME THEME</SectionLabel>
        <div className="mt-2 grid grid-cols-2 gap-1.5">
          {frameThemes.map((theme) => {
            const active = theme.id === themeId;
            return (
              <button
                key={theme.id}
                type="button"
                aria-pressed={active}
                onClick={() => onThemeChange(theme.id)}
                title={theme.blurb}
                className={`rounded-xl border p-2 text-left transition ${
                active ?
                'border-accent bg-panelAlt' :
                'border-line hover:border-accent'}`
                }>
                
                <span className="flex items-center gap-1.5">
                  {theme.swatches.map((color) =>
                  <span
                    key={color}
                    className="h-4 w-4 rounded-full border border-line"
                    style={{ background: color }} />

                  )}
                  {active ?
                  <CheckIcon
                    className="ml-auto h-3.5 w-3.5 text-pop"
                    aria-hidden="true" /> :

                  null}
                </span>
                <span className="mt-1.5 block font-mono text-[10px] font-semibold tracking-[0.14em] text-ink">
                  {theme.label.toUpperCase()}
                </span>
                <span className="mt-0.5 block font-mono text-[9px] leading-snug text-inkSoft">
                  {theme.blurb}
                </span>
              </button>);

          })}
        </div>
      </div>

      <div>
        <SectionLabel>RING TRIM</SectionLabel>
        <div className="mt-2 grid grid-cols-4 gap-1.5">
          {frameTrims.map((trim) => {
            const active = trim.id === trimId;
            return (
              <button
                key={trim.id}
                type="button"
                aria-pressed={active}
                onClick={() => onTrimChange(trim.id)}
                title={trim.hint}
                className={`flex flex-col items-center gap-1 rounded-xl border px-1 py-2 transition ${
                active ?
                'border-accent bg-panelAlt text-ink' :
                'border-line text-inkSoft hover:border-accent'}`
                }>
                
                <TrimGlyph kind={trim.id} />
                <span className="font-mono text-[9px] font-semibold tracking-[0.1em]">
                  {trim.label.toUpperCase()}
                </span>
              </button>);

          })}
        </div>
      </div>
    </div>);

}