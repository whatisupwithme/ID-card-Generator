import React from 'react';
import { ShuffleIcon } from 'lucide-react';
import { TextField } from './ui/TextField';
import type { Format, GraphicOptions } from '../types';

type Props = {
  format: Format;
  options: GraphicOptions;
  onChange: (patch: Partial<GraphicOptions>) => void;
  onShuffleTitle: () => void;
};

export function FrontFields({
  format,
  options,
  onChange,
  onShuffleTitle
}: Props) {
  return (
    <div className="space-y-3">
      {format === 'id' ?
      <>
          <TextField
          id="name"
          label="NAME"
          value={options.name}
          maxLength={28}
          placeholder="Aarav Mehta"
          onChange={(name) => onChange({ name })} />
        
          <TextField
          id="role"
          label="STACK / ROLE"
          value={options.role}
          maxLength={42}
          placeholder="Next.js · Rust · infra"
          onChange={(role) => onChange({ role })} />
        
          <TextField
          id="title"
          label="BUILDER CLASS"
          value={options.title}
          maxLength={30}
          placeholder="Midnight Shipper"
          onChange={(title) => onChange({ title })}
          action={
          <button
            type="button"
            onClick={onShuffleTitle}
            aria-label="Generate a new builder class"
            className="shrink-0 rounded-xl border border-line px-3 text-ink transition hover:border-accent">
            
                <ShuffleIcon className="h-4 w-4" aria-hidden="true" />
              </button>
          } />
        
        </> :
      null}

      <TextField
        id="handle"
        label="X HANDLE (OPTIONAL)"
        value={options.handle}
        maxLength={20}
        placeholder="yourhandle"
        onChange={(handle) => onChange({ handle: handle.replace(/[^\w]/g, '') })} />
      
    </div>);

}