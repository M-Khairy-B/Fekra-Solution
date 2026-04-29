import { TouchableOpacity, Text, ActivityIndicator, type TouchableOpacityProps } from 'react-native'

type Variant = 'primary' | 'outline' | 'ghost' | 'danger'

interface ButtonProps extends TouchableOpacityProps {
  variant?:  Variant
  label?:    string
  loading?:  boolean
  children?: React.ReactNode
}

const CONTAINER: Record<Variant, string> = {
  primary: 'bg-indigo-600 rounded-xl py-3.5 px-5 items-center flex-row justify-center',
  outline: 'border border-indigo-600 rounded-xl py-3.5 px-5 items-center flex-row justify-center bg-white',
  ghost:   'rounded-xl py-3.5 px-5 items-center flex-row justify-center',
  danger:  'bg-red-600 rounded-xl py-3.5 px-5 items-center flex-row justify-center',
}

const LABEL: Record<Variant, string> = {
  primary: 'text-white font-semibold text-sm',
  outline: 'text-indigo-600 font-semibold text-sm',
  ghost:   'text-slate-600 font-semibold text-sm',
  danger:  'text-white font-semibold text-sm',
}

const SPINNER: Record<Variant, string> = {
  primary: '#ffffff',
  outline: '#4f46e5',
  ghost:   '#475569',
  danger:  '#ffffff',
}

export function Button({
  variant = 'primary',
  label,
  loading = false,
  disabled,
  children,
  className,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={isDisabled}
      className={`${CONTAINER[variant]} ${isDisabled ? 'opacity-50' : ''} ${className ?? ''}`}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={SPINNER[variant]} size="small" />
      ) : (
        label
          ? <Text className={LABEL[variant]}>{label}</Text>
          : children
      )}
    </TouchableOpacity>
  )
}
