import { useEffect, useMemo } from 'react'
import { FlatList, View, Text, ActivityIndicator } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch } from '../redux/store'
import { useGetUsersQuery } from '../redux/usersApi'
import {
  setAllUsers,
  showMore,
  setSearchQuery,
  resetDisplay,
  selectCachedUsers,
  selectDisplayedCount,
  selectSearchQuery,
} from '../redux/usersSlice'
import { UserCard } from '../components/UserCard'
import { SearchBar } from '../components/SearchBar'
import { LoadMoreButton } from '../components/LoadMoreButton'
import { Header } from '../components/Header'
import { IconWarning, IconSearchEmpty } from '../components/icons'
import type { User } from '../types'

function EmptyState({ isLoading, isError }: { isLoading: boolean; isError: boolean }) {
  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center py-20">
        <ActivityIndicator size="large" color="#4f46e5" />
        <Text className="text-slate-400 text-sm mt-3">Loading users...</Text>
      </View>
    )
  }
  if (isError) {
    return (
      <View className="flex-1 items-center justify-center py-20 px-8">
        <View className="mb-3">
          <IconWarning size={48} color="#f59e0b" />
        </View>
        <Text className="text-slate-700 font-semibold text-base text-center">
          Failed to load users
        </Text>
        <Text className="text-slate-400 text-sm text-center mt-1">
          Check your connection and try again.
        </Text>
      </View>
    )
  }
  return (
    <View className="flex-1 items-center justify-center py-20">
      <View className="mb-3">
        <IconSearchEmpty size={48} color="#cbd5e1" />
      </View>
      <Text className="text-slate-500 font-medium">No users found</Text>
    </View>
  )
}

export function UserListScreen() {
  const dispatch       = useDispatch<AppDispatch>()
  const cachedUsers    = useSelector(selectCachedUsers)
  const displayedCount = useSelector(selectDisplayedCount)
  const searchQuery    = useSelector(selectSearchQuery)

  useEffect(() => {
    dispatch(resetDisplay())
  }, [dispatch])

  const { data, isFetching, isError, isLoading } = useGetUsersQuery()

  useEffect(() => {
    if (data) dispatch(setAllUsers(data))
  }, [data, dispatch])

  const isSearching = searchQuery.trim() !== ''

  const filtered = useMemo(
    () =>
      isSearching
        ? cachedUsers.filter((u: User) =>
            u.name.toLowerCase().includes(searchQuery.toLowerCase())
          )
        : cachedUsers,
    [cachedUsers, searchQuery, isSearching]
  )

  const displayed = isSearching ? filtered : filtered.slice(0, displayedCount)
  const hasMore   = !isSearching && displayedCount < cachedUsers.length

  return (
    <View className="flex-1 bg-slate-100">
      <Header totalLoaded={cachedUsers.length} totalShown={displayed.length} />

      <FlatList
        data={displayed}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <UserCard user={item} />}
        removeClippedSubviews
        maxToRenderPerBatch={10}
        windowSize={5}
        initialNumToRender={5}
        ListHeaderComponent={
          <SearchBar
            value={searchQuery}
            onChangeText={(t) => dispatch(setSearchQuery(t))}
          />
        }
        ListFooterComponent={
          <LoadMoreButton
            onPress={() => dispatch(showMore())}
            loading={isFetching && cachedUsers.length === 0}
            disabled={!hasMore}
          />
        }
        ListEmptyComponent={
          <EmptyState isLoading={isLoading} isError={isError} />
        }
        contentContainerStyle={{ paddingBottom: 24 }}
      />
    </View>
  )
}
