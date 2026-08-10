import React from 'react';
import { motion } from 'framer-motion';
import type { Mode } from '../types';

type Props = {
  mode: Mode;
  onToggle: () => void;
};

/** Pull-cord bulb: tug it to flip the whole studio between day and night. */
export function HangingBulb({ mode, onToggle }: Props) {
  const lit = mode === 'light';

  return (
    <div className="absolute right-2 top-0 z-20 hidden 2xl:block">
      <button
        type="button"
        onClick={onToggle}
        aria-label={lit ? 'Pull the cord for night mode' : 'Pull the cord for day mode'}
        className="group flex flex-col items-center focus-visible:outline-none">
        
        <span
          aria-hidden="true"
          className="block h-24 w-[2px]"
          style={{ background: 'var(--line)' }} />
        
        <motion.span
          key={mode}
          aria-hidden="true"
          className="relative block origin-top"
          initial={{ rotate: -7 }}
          animate={{ rotate: [-7, 5, -2, 0] }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          whileHover={{ y: 3 }}>
          
          {lit ?
          <span className="absolute -inset-5 rounded-full bg-accent opacity-40 blur-xl" /> :
          null}
          <svg
            width="42"
            height="58"
            viewBox="0 0 42 58"
            className="relative block">
            
            <rect
              x="15"
              y="0"
              width="12"
              height="12"
              rx="2"
              fill="var(--line)" />
            
            <rect
              x="13"
              y="10"
              width="16"
              height="10"
              rx="2"
              fill="var(--ink-soft)" />
            
            <circle
              cx="21"
              cy="36"
              r="16"
              fill={lit ? 'var(--accent)' : 'var(--panel-2)'}
              stroke="var(--line)"
              strokeWidth="2" />
            
            <path
              d="M15 40 l4 -9 l4 9 l4 -9"
              fill="none"
              stroke={lit ? 'var(--accent-ink)' : 'var(--ink-soft)'}
              strokeWidth="2"
              strokeLinecap="round" />
            
          </svg>
        </motion.span>
        <span className="mt-2 font-mono text-[9px] tracking-[0.24em] text-inkSoft opacity-0 transition group-hover:opacity-100">
          {lit ? 'PULL FOR NIGHT' : 'PULL FOR DAY'}
        </span>
      </button>
    </div>);

}