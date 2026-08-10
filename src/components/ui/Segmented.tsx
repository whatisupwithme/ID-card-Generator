import React from 'react';

export type SegmentedOption<T extends string> = {
  value: T;
  label: string;
  icon?: React.ReactNode;
};

type Props<T extends string> = {
  options: SegmentedOption<T>[];
  value: T;
  onChange: (value: T) => void;
  ariaLabel: string;
  compact?: boolean;
};

export function Segmented<T extends string>({
  options,
  value,
  onChange,
  ariaLabel,
  compact = false
}: Props<T>) {
  return (
    <div
      role="group"
      aria-label={ariaLabel}
      className="grid gap-1 rounded-full border border-line bg-panelAlt p-1"
      style={{ gridTemplateColumns: `repeat(${options.length}, minmax(0, 1fr))` }}>
      
      {options.map((option) => {
        const active = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(option.value)}
            className={`inline-flex items-center justify-center gap-1.5 rounded-full font-mono font-semibold tracking-[0.16em] transition ${
            compact ? 'px-2.5 py-1.5 text-[10px]' : 'px-3 py-2 text-[11px]'} ${

            active ?
            'bg-accent text-accentInk' :
            'text-inkSoft hover:text-ink'}`
            }>
            
            {option.icon}
            {option.label}
          </button>);

      })}
    </div>);

}