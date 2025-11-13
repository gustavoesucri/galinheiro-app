import React from 'react'
import { Button } from 'react-native-paper'
import { colors, layout } from '../styles/theme'

export default function AddEggButton({ onPress, style }) {
  return (
    <Button
      mode="contained"
      icon="plus"
      buttonColor={colors.primary}
      textColor={colors.textPrimary}
      iconColor={colors.textPrimary}
      onPress={onPress}
      style={[layout.button, style]}
    >
      Adicionar Ovo
    </Button>
  )
}
