import React from 'react';
import { motion } from 'framer-motion';
import { MoonIcon, SunIcon } from 'lucide-react';
import type { Mode } from '../types';

type Props = {
  mode: Mode;
  onChange: (mode: Mode) => void;
};

/** Sun / moon switch — the same toggle the hanging bulb pulls. */
export function ModeToggle({ mode, onChange }: Props) {
  const dark = mode === 'dark';
  return (
    <button
      type="button"
      role="switch"
      aria-checked={dark}
      aria-label="Switch between day and night mode"
      onClick={() => onChange(dark ? 'light' : 'dark')}
      className="relative inline-flex items-center gap-1 rounded-full border border-line bg-panelAlt p-1 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
      
      <motion.span
        aria-hidden="true"
        className="absolute left-1 top-1 h-7 w-7 rounded-full bg-accent"
        animate={{ x: dark ? 30 : 0 }}
        transition={{ type: 'spring', stiffness: 420, damping: 30 }} />
      
      <span
        className={`relative z-10 grid h-7 w-7 place-items-center transition-colors ${
        dark ? 'text-inkSoft' : 'text-accentInk'}`
        }>
        
        <SunIcon className="h-4 w-4" aria-hidden="true" />
      </span>
      <span
        className={`relative z-10 grid h-7 w-7 place-items-center transition-colors ${
        dark ? 'text-accentInk' : 'text-inkSoft'}`
        }>
        
        <MoonIcon className="h-4 w-4" aria-hidden="true" />
      </span>
    </button>);

}