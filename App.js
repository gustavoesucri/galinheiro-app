import { StatusBar } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { Provider } from 'react-redux'
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper'

import { store } from './src/redux/store'
import AppNavigator from './src/navigation/AppNavigator'
import { colors } from './src/styles/theme'


// integração da paleta de cores ao React Native Paper
const paperTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.primary,
    accent: colors.accent,
    background: colors.background,
    surface: colors.surface,
    text: colors.textPrimary,
    placeholder: colors.textSecondary,
    notification: colors.accent,
  },
  roundness: 8,
}

// O Provider do Redux disponibiliza o estado global
// O PaperProvider cuida do tema visual e componentes prontos
export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider theme={paperTheme}>
        <NavigationContainer>
          <StatusBar
            barStyle="dark-content"
            backgroundColor={colors.background}
          />
          <AppNavigator />
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  )
}
