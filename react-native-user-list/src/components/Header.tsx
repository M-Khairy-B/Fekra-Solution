import { View, Text } from 'react-native'
import { IconPeople } from './icons'

interface HeaderProps {
  totalLoaded: number
  totalShown: number
}

export function Header({ totalLoaded, totalShown }: HeaderProps) {
  return (
    <View className="bg-indigo-700 pt-14 pb-6 px-5">
      {/* Top row — icon + title */}
      <View className="flex-row items-center gap-3">
        {/* App icon */}
        <View className="w-11 h-11 bg-white/20 rounded-2xl items-center justify-center">
          <IconPeople size={22} color="white" />
        </View>

        <View className="flex-1">
          <Text className="text-white text-xl font-bold tracking-tight leading-tight">
            User Directory
          </Text>

        </View>

        {/* Online indicator */}
        <View className="flex-row items-center gap-1.5 bg-white/10 rounded-full px-3 py-1.5">
          <View className="w-2 h-2 rounded-full bg-emerald-400" />
          <Text className="text-white text-xs font-medium">Live</Text>
        </View>
      </View>

      {/* Divider */}
      <View className="h-px bg-white/10 my-4" />

      {/* Stats row */}
      <View className="flex-row gap-3">
        <View className="flex-1 bg-white/10 rounded-2xl px-4 py-3">
          <Text className="text-indigo-200 text-xs mb-0.5">Loaded</Text>
          <Text className="text-white text-2xl font-bold leading-tight">{totalLoaded}</Text>
          <Text className="text-indigo-300 text-xs">users fetched</Text>
        </View>

        <View className="flex-1 bg-white/10 rounded-2xl px-4 py-3">
          <Text className="text-indigo-200 text-xs mb-0.5">Showing</Text>
          <Text className="text-white text-2xl font-bold leading-tight">{totalShown}</Text>
          <Text className="text-indigo-300 text-xs">after search</Text>
        </View>

        <View className="flex-1 bg-indigo-500/50 rounded-2xl px-4 py-3">
          <Text className="text-indigo-200 text-xs mb-0.5">Source</Text>
          <Text className="text-white text-2xl font-bold leading-tight">10</Text>
          <Text className="text-indigo-300 text-xs">total</Text>
        </View>
      </View>
    </View>
  )
}
