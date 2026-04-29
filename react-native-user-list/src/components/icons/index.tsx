import { Ionicons } from '@expo/vector-icons'

interface IconProps {
  size?: number
  color?: string
}

export function IconPeople({ size = 22, color = 'white' }: IconProps) {
  return <Ionicons name="people" size={size} color={color} />
}

export function IconMail({ size = 14, color = '#6366f1' }: IconProps) {
  return <Ionicons name="mail-outline" size={size} color={color} />
}

export function IconLocation({ size = 14, color = '#94a3b8' }: IconProps) {
  return <Ionicons name="location-outline" size={size} color={color} />
}

export function IconSearch({ size = 18, color = '#94a3b8' }: IconProps) {
  return <Ionicons name="search" size={size} color={color} />
}

export function IconWarning({ size = 48, color = '#f59e0b' }: IconProps) {
  return <Ionicons name="warning-outline" size={size} color={color} />
}

export function IconSearchEmpty({ size = 48, color = '#cbd5e1' }: IconProps) {
  return <Ionicons name="search-circle-outline" size={size} color={color} />
}
