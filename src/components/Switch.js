import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Switch } from 'react-native-paper'
import { useSelector } from 'react-redux'
import { useTema } from '../hooks/useTema'
import { colors, typography } from '../styles/theme'

export default function SwitchField({ label, value, onValueChange, style }) {
  const botoesClaros = useSelector(state => state.botaoModo.botoesClaros)
  const tema = useTema()
  
  const switchColor = botoesClaros ? tema.colors.primaryOrange : tema.colors.primary

  return (
    <View style={[styles.container, style]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <Switch
        value={value}
        onValueChange={onValueChange}
        color={switchColor}
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
