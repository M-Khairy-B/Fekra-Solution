import { Input } from './ui/Input'
import { IconSearch } from './icons'

interface SearchBarProps {
  value:        string
  onChangeText: (text: string) => void
}

export function SearchBar({ value, onChangeText }: SearchBarProps) {
  return (
    <Input
      value={value}
      onChangeText={onChangeText}
      placeholder="Search users by name..."
      leftIcon={<IconSearch size={18} color="#94a3b8" />}
      autoCorrect={false}
      autoCapitalize="none"
      clearButtonMode="while-editing"
      containerClassName="mx-4 mt-4 mb-2"
    />
  )
}
