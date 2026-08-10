import React from 'react';

const PETALS = [0, 45, 90, 135, 180, 225, 270, 315];

type Props = {
  height?: number;
  className?: string;
};

/**
 * Goa block-print band, rebuilt as an SVG pattern. Used along page and
 * panel edges so the print motif carries into the interface itself.
 */
export function OrnamentStrip({ height = 22, className = '' }: Props) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      width="100%"
      height={height}
      viewBox="0 0 400 40"
      preserveAspectRatio="none"
      focusable="false">
      
      <defs>
        <pattern
          id="goa-block-print"
          width="40"
          height="40"
          patternUnits="userSpaceOnUse">
          
          <rect width="40" height="40" fill="#0E5B34" />
          <g transform="translate(20 20)">
            {PETALS.map((angle) =>
            <ellipse
              key={angle}
              rx="6"
              ry="3.4"
              fill="#A6D96A"
              transform={`rotate(${angle}) translate(7 0)`} />

            )}
            <circle r="2.6" fill="#0E5B34" />
          </g>
          <path d="M40 4 L45 4 L40 14 L35 4 Z" fill="#F0186B" />
          <path d="M40 36 L45 36 L40 26 L35 36 Z" fill="#F0186B" />
          <rect y="0" width="40" height="3" fill="#7ED957" />
          <rect y="37" width="40" height="3" fill="#7ED957" />
        </pattern>
      </defs>
      <rect width="400" height="40" fill="url(#goa-block-print)" />
    </svg>);

}