import React from 'react';
import { OrnamentStrip } from './OrnamentStrip';
import type { Mode } from '../types';

const FROND_ANGLES = [-170, -140, -110, -80, -50, -20, 12];

const STARS = [
[6, 12, 1.6],
[14, 30, 1.1],
[22, 8, 1.8],
[31, 22, 1.2],
[39, 6, 1.5],
[46, 26, 1],
[54, 14, 1.7],
[63, 30, 1.2],
[71, 9, 1.4],
[79, 24, 1.1],
[88, 15, 1.8],
[95, 32, 1.3],
[10, 44, 1.2],
[35, 48, 1],
[68, 46, 1.4],
[92, 52, 1.1]];


const GULLS = [
{ x: 26, y: 16, s: 1 },
{ x: 33, y: 12, s: 0.7 },
{ x: 74, y: 20, s: 0.85 }];


function Palm({
  x,
  y,
  scale,
  flip = false,
  color






}: {x: number;y: number;scale: number;flip?: boolean;color: string;}) {
  return (
    <g
      transform={`translate(${x} ${y}) scale(${flip ? -scale : scale} ${scale})`}>
      
      <path
        d="M0 0 C-8 -60 -4 -110 6 -150"
        stroke={color}
        strokeWidth="11"
        strokeLinecap="round"
        fill="none" />
      
      {FROND_ANGLES.map((angle) =>
      <ellipse
        key={angle}
        cx="52"
        cy="-150"
        rx="48"
        ry="11"
        fill={color}
        transform={`rotate(${angle} 6 -150)`} />

      )}
      <circle cx="14" cy="-138" r="7" fill={color} />
      <circle cx="-2" cy="-132" r="6" fill={color} />
    </g>);

}

/**
 * Fixed decorative scene behind the studio — palms, a sun or moon, gulls and
 * the block-print band. Purely absolute so it never adds page height.
 */
export function Backdrop({ mode }: {mode: Mode;}) {
  const dark = mode === 'dark';

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden">
      
      {dark ?
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 100 60"
        preserveAspectRatio="none">
        
          {STARS.map(([x, y, r]) =>
        <circle
          key={`${x}-${y}`}
          cx={x}
          cy={y}
          r={r / 10}
          fill="var(--ink)"
          opacity={0.55} />

        )}
        </svg> :
      null}

      {/* Sun / moon */}
      <div className="absolute left-[2%] top-[7%] hidden sm:block">
        <div className="relative">
          <div
            className="absolute -inset-6 rounded-full opacity-40 blur-2xl"
            style={{ background: dark ? 'var(--ink-soft)' : 'var(--accent)' }} />
          
          {dark ?
          <svg width="112" height="112" viewBox="0 0 112 112">
              <circle cx="56" cy="56" r="40" fill="#E8E2CC" />
              <circle cx="44" cy="46" r="8" fill="#CFC7AC" />
              <circle cx="66" cy="62" r="6" fill="#CFC7AC" />
              <circle cx="52" cy="72" r="4.5" fill="#CFC7AC" />
              <circle cx="72" cy="42" r="3.5" fill="#CFC7AC" />
            </svg> :

          <svg width="132" height="132" viewBox="0 0 132 132">
              <circle cx="66" cy="66" r="34" fill="var(--accent)" />
              {Array.from({ length: 16 }).map((_, i) => {
              const a = i / 16 * Math.PI * 2;
              return (
                <line
                  key={i}
                  x1={66 + Math.cos(a) * 42}
                  y1={66 + Math.sin(a) * 42}
                  x2={66 + Math.cos(a) * 60}
                  y2={66 + Math.sin(a) * 60}
                  stroke="var(--accent)"
                  strokeWidth="4"
                  strokeLinecap="round" />);


            })}
            </svg>
          }
        </div>
      </div>

      {/* Gulls */}
      <svg
        className="absolute inset-0 hidden h-full w-full sm:block"
        viewBox="0 0 100 60"
        preserveAspectRatio="none">
        
        {GULLS.map((g) =>
        <path
          key={`${g.x}-${g.y}`}
          d={`M${g.x} ${g.y} q ${0.9 * g.s} ${-0.9 * g.s} ${1.8 * g.s} 0 q ${
          0.9 * g.s} ${
          -0.9 * g.s} ${1.8 * g.s} 0`}
          fill="none"
          stroke="var(--ink-soft)"
          strokeWidth="0.28"
          strokeLinecap="round" />

        )}
      </svg>

      {/* Palms */}
      <svg
        className="absolute bottom-0 left-0 h-[42%] w-auto opacity-[0.55]"
        viewBox="0 0 320 300"
        preserveAspectRatio="xMinYMax meet">
        
        <Palm x={70} y={300} scale={1.1} color="var(--scene)" />
        <Palm x={190} y={300} scale={0.72} color="var(--scene-soft)" />
      </svg>
      <svg
        className="absolute bottom-0 right-0 h-[48%] w-auto opacity-[0.55]"
        viewBox="0 0 320 300"
        preserveAspectRatio="xMaxYMax meet">
        
        <Palm x={250} y={300} scale={1.2} flip color="var(--scene)" />
        <Palm x={130} y={300} scale={0.8} flip color="var(--scene-soft)" />
      </svg>

      <OrnamentStrip
        className="absolute bottom-0 left-0 w-full"
        height={16} />
      
    </div>);

}