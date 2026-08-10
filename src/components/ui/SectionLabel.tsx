import React from 'react';

type Props = {
  children: React.ReactNode;
  as?: 'span' | 'legend' | 'label';
  htmlFor?: string;
};

export function SectionLabel({ children, as = 'span', htmlFor }: Props) {
  const Tag = as;
  return (
    <Tag
      htmlFor={htmlFor}
      className="block font-mono text-[10px] font-semibold tracking-[0.28em] text-ink">
      
      {children}
    </Tag>);

}