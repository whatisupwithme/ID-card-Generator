import React from 'react';
import { SectionLabel } from './SectionLabel';

type Props = {
  id: string;
  label: string;
  value: string;
  placeholder?: string;
  maxLength?: number;
  onChange: (value: string) => void;
  action?: React.ReactNode;
};

export function TextField({
  id,
  label,
  value,
  placeholder,
  maxLength,
  onChange,
  action
}: Props) {
  return (
    <div>
      <SectionLabel as="label" htmlFor={id}>
        {label}
      </SectionLabel>
      <div className="mt-1.5 flex gap-1.5">
        <input
          id={id}
          value={value}
          maxLength={maxLength}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-xl border border-line bg-panel px-3 py-2 font-mono text-[13px] text-ink outline-none transition placeholder:text-inkSoft focus:border-accent focus:ring-2 focus:ring-accent" />
        
        {action}
      </div>
    </div>);

}