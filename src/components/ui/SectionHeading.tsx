import type { ReactNode } from 'react'

interface SectionHeadingProps {
  eyebrow: string
  title: ReactNode
  description?: string
  align?: 'left' | 'center'
  tone?: 'light' | 'dark'
}

export function SectionHeading({ eyebrow, title, description, align = 'left', tone = 'light' }: SectionHeadingProps) {
  return <div className={align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}>
    <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-signal">{eyebrow}</p>
    <h2 className={`font-display text-4xl uppercase leading-[0.95] sm:text-5xl ${tone === 'dark' ? 'text-ink' : 'text-white'}`}>{title}</h2>
    {description && <p className={`mt-5 text-base leading-7 ${tone === 'dark' ? 'text-ink/70' : 'text-mist'}`}>{description}</p>}
  </div>
}
