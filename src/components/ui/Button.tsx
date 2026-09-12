import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'primary' | 'outline'
  href?: string
}

export function Button({ children, variant = 'primary', href, className = '', ...props }: ButtonProps) {
  const styles = `inline-flex items-center justify-center gap-2 rounded-sm px-5 py-3 text-xs font-bold uppercase tracking-[0.12em] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-signal focus:ring-offset-2 focus:ring-offset-ink active:scale-[0.98] ${variant === 'primary' ? 'bg-signal text-white hover:bg-signal-dark' : 'border border-white/25 text-white hover:border-signal hover:text-signal'} ${className}`
  if (href) return <a href={href} className={styles}>{children}</a>
  return <button className={styles} {...props}>{children}</button>
}
