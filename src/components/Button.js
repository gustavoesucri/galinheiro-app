import React from 'react'
import { Button as PaperButton } from 'react-native-paper'
import { layout, colors } from '../styles/theme'

export default function Button({ children, style, ...props }) {
  return (
    <PaperButton
      mode="contained"
      style={[layout.button, style]}
      {...props}
    >
      {children}
    </PaperButton>
  )
}
