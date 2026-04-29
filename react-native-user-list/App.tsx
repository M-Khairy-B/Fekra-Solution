import './global.css'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { store, persistor } from './src/redux/store'
import { UserListScreen } from './src/screens/UserListScreen'

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <UserListScreen />
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  )
}
