import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Checkbox } from 'react-native-paper'
import { useSelector } from 'react-redux'
import { useTema } from '../hooks/useTema'

export default function CheckboxField({ label, value, onValueChange, style }) {
  const botoesClaros = useSelector(state => state.botaoModo.botoesClaros)
  const tema = useTema()
  const { colors, typography } = tema
  
  const checkboxColor = botoesClaros ? tema.colors.primaryOrange : tema.colors.primary

  return (
    <TouchableOpacity 
      style={[styles.container, style]}
      onPress={() => onValueChange(!value)}
      activeOpacity={0.7}
    >
      <Checkbox
        status={value ? 'checked' : 'unchecked'}
        onPress={() => onValueChange(!value)}
        color={checkboxColor}
      />
      {label && (
        <Text style={[styles.label, typography.body, { color: colors.textPrimary }]}>
          {label}
        </Text>
      )}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
    marginLeft: 4,
  },
})
