import React from 'react'

type Variant = 'primary' | 'danger' | 'ghost' | 'outline' | 'active'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
}

const VARIANTS: Record<Variant, string> = {
  primary: 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm',
  danger:  'bg-red-600 hover:bg-red-700 text-white shadow-sm',
  ghost:   'text-slate-500 hover:text-indigo-600 hover:bg-slate-100',
  outline: 'border border-slate-300 bg-white text-slate-600 hover:border-indigo-400 hover:text-indigo-600',
  active:  'bg-indigo-600 text-white shadow-sm',
}

export function Button({ variant = 'primary', className = '', children, ...props }: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer ${VARIANTS[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
