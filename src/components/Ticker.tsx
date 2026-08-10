import React from 'react';

const ITEMS = [
'#FRAMEINGOA',
'HACKER HOUSE GOA 2026',
'28–31 OCT',
'NOTHING LEAVES YOUR DEVICE',
'BUILDER MANIFEST ON THE BACK',
'SUSEGAD MODE: ON'];


/** Slim marquee strip — adds signal at the page edge without adding scroll. */
export function Ticker() {
  const row = [...ITEMS, ...ITEMS];
  return (
    <div className="relative mt-3 overflow-hidden rounded-full border border-line bg-panelAlt py-1.5">
      <div className="goa-marquee flex w-max items-center gap-6 whitespace-nowrap">
        {[0, 1].map((copy) =>
        <div key={copy} className="flex items-center gap-6">
            {row.map((item, i) =>
          <span
            key={`${copy}-${item}-${i}`}
            className="flex items-center gap-6 font-mono text-[10px] tracking-[0.26em] text-inkSoft">
            
                {item}
                <span aria-hidden="true" className="text-pop">
                  ◆
                </span>
              </span>
          )}
          </div>
        )}
      </div>
    </div>);

}