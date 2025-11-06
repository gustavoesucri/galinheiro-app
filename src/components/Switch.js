import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Switch } from 'react-native-paper'
import { colors, typography } from '../styles/theme'

export default function SwitchField({ label, value, onValueChange, style }) {
  return (
    <View style={[styles.container, style]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <Switch
        value={value}
        onValueChange={onValueChange}
        color={colors.primary}        // cor do toggle ativo
        style={styles.switch}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 4,
    ...typography.body,
    flex: 1, // para ocupar espaço e manter alinhamento
  },
  switch: {
    marginLeft: 8,
  },
})
