import React from 'react'
import { Switch as PaperSwitch } from 'react-native-paper'
import { colors } from '../styles/theme'

export default function Switch({ value, onValueChange, ...props }) {
  return (
    <PaperSwitch
      value={value}
      onValueChange={onValueChange}
      color={colors.primary}
      {...props}
    />
  )
}
