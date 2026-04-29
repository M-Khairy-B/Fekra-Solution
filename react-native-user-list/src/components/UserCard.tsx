import React from 'react'
import { View, Text } from 'react-native'
import type { User } from '../types'
import { formatAddress } from '../utils/formatAddress'
import { IconMail, IconLocation } from './icons'

interface UserCardProps {
  user: User
}

function UserCardComponent({ user }: UserCardProps) {
  return (
    <View className="bg-white mx-4 my-1.5 rounded-2xl p-4 shadow-sm border border-slate-100">
      {/* Avatar row */}
      <View className="flex-row items-center gap-3">
        <View className="w-11 h-11 rounded-full bg-indigo-100 items-center justify-center">
          <Text className="text-indigo-700 font-bold text-base">
            {user.name.charAt(0).toUpperCase()}
          </Text>
        </View>
        <View className="flex-1">
          <Text className="text-slate-800 text-base font-semibold" numberOfLines={1}>
            {user.name}
          </Text>
          <Text className="text-slate-400 text-xs">@{user.username}</Text>
        </View>
      </View>

      {/* Divider */}
      <View className="h-px bg-slate-100 my-3" />

      {/* Details */}
      <View className="gap-1.5">
        <View className="flex-row items-center gap-2">
          <View className="w-5 h-5 rounded-full bg-indigo-50 items-center justify-center">
            <IconMail size={12} color="#6366f1" />
          </View>
          <Text className="text-indigo-600 text-sm flex-1" numberOfLines={1}>
            {user.email}
          </Text>
        </View>

        <View className="flex-row items-center gap-2">
          <View className="w-5 h-5 rounded-full bg-slate-50 items-center justify-center">
            <IconLocation size={12} color="#94a3b8" />
          </View>
          <Text className="text-slate-400 text-xs flex-1" numberOfLines={1}>
            {formatAddress(user.address)}
          </Text>
        </View>
      </View>
    </View>
  )
}

export const UserCard = React.memo(UserCardComponent)
