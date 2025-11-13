import React from 'react'
import { View } from 'react-native'
import TemaToggleButton from '../components/TemaToggleButton'
import BotaoModoToggleButton from '../components/BotaoModoToggleButton'
import AlertaIconButton from '../components/AlertaIconButton'

export const getStackScreenOptions = (tema) => {
  return {
    headerStyle: { backgroundColor: tema.colors.primary },
    headerTintColor: tema.colors.textPrimary,
    headerTitleStyle: {
      color: tema.colors.textPrimary,
    },
    headerRight: () => (
      <View style={{ flexDirection: 'row' }}>
        <AlertaIconButton />
        <BotaoModoToggleButton />
        <TemaToggleButton />
      </View>
    ),
  }
}
