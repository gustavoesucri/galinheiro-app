import React from 'react'
import { View } from 'react-native'
import TemaToggleButton from '../components/TemaToggleButton'
import BotaoModoToggleButton from '../components/BotaoModoToggleButton'

export const getStackScreenOptions = (tema) => {
  return {
    headerStyle: { backgroundColor: tema.colors.primary },
    headerTintColor: tema.colors.surface,
    headerTitleStyle: {
      color: tema.colors.surface,
    },
    headerRight: () => (
      <View style={{ flexDirection: 'row' }}>
        <BotaoModoToggleButton />
        <TemaToggleButton />
      </View>
    ),
  }
}
