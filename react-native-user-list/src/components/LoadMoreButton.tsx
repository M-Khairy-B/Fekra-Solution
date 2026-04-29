import { View } from 'react-native'
import { Button } from './ui/Button'

interface LoadMoreButtonProps {
  onPress:  () => void
  loading:  boolean
  disabled: boolean
}

export function LoadMoreButton({ onPress, loading, disabled }: LoadMoreButtonProps) {
  if (disabled && !loading) return null

  return (
    <View className="mx-4 my-4">
      <Button
        variant="primary"
        label={loading ? undefined : 'Load More'}
        loading={loading}
        disabled={disabled}
        onPress={onPress}
      />
    </View>
  )
}
