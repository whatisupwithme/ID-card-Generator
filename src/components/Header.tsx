import React from 'react';

export function Header() {
  return (
    <header className="w-full text-center">
      <p className="font-mono text-[11px] sm:text-xs tracking-[0.35em] text-goa-yellow">
        GOA, INDIA · 28–31 OCT 2026
      </p>
      <h1 className="mt-3 font-display text-4xl sm:text-6xl lg:text-7xl leading-none text-goa-cream">
        FRAME IN <span className="text-goa-yellow">GOA</span>
      </h1>
      <p className="mx-auto mt-4 max-w-xl font-mono text-xs sm:text-sm leading-relaxed text-goa-cream/70">
        Drop a photo, take the frame, post it. Your HH Goa 2026 profile picture
        or builder ID in one pass — no login, nothing leaves your device.
      </p>
    </header>);

}