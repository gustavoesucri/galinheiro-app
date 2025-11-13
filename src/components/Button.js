import React from 'react'
import { Button as PaperButton } from 'react-native-paper'
import { layout, colors } from '../styles/theme'

export default function Button({ children, style, mode = 'contained', ...props }) {
  return (
    <PaperButton
      mode={mode}
      style={[layout.button, style]}
      buttonColor={colors.primary}
      textColor={colors.textPrimary}
      {...props}
    >
      {children}
    </PaperButton>
  )
}
