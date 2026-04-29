import { View, TextInput, Text, type TextInputProps } from 'react-native'

interface InputProps extends TextInputProps {
  label?:       string
  leftIcon?:    React.ReactNode
  rightIcon?:   React.ReactNode
  error?:       string
  containerClassName?: string
}

export function Input({
  label,
  leftIcon,
  rightIcon,
  error,
  containerClassName = '',
  ...props
}: InputProps) {
  const hasBorder = error ? 'border-red-400' : 'border-slate-200'

  return (
    <View className={containerClassName}>
      {label && (
        <Text className="text-slate-600 text-sm font-medium mb-1.5">{label}</Text>
      )}

      <View className={`flex-row items-center bg-white rounded-xl px-4 border ${hasBorder} shadow-sm`}>
        {leftIcon && (
          <View className="mr-2">{leftIcon}</View>
        )}

        <TextInput
          className="flex-1 py-3 text-slate-800 text-sm"
          placeholderTextColor="#94a3b8"
          {...props}
        />

        {rightIcon && (
          <View className="ml-2">{rightIcon}</View>
        )}
      </View>

      {error && (
        <Text className="text-red-500 text-xs mt-1">{error}</Text>
      )}
    </View>
  )
}
