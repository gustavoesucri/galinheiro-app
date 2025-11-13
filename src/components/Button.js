import React from 'react'
import { StyleSheet } from 'react-native'
import { Button as PaperButton } from 'react-native-paper'
import { layout, colors } from '../styles/theme'

export default function Button({ children, style, mode = 'contained', fullWidth = true, ...props }) {
  return (
    <PaperButton
      mode={mode}
      style={[layout.button, !fullWidth && styles.buttonCompact, style]}
      buttonColor={colors.primary}
      textColor={colors.textPrimary}
      {...props}
    >
      {children}
    </PaperButton>
  )
}

const styles = StyleSheet.create({
  buttonCompact: {
    alignSelf: 'flex-start',
    maxWidth: 250,
  },
})
