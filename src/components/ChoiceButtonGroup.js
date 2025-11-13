import React from 'react'
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native'
import { useSelector } from 'react-redux'
import { useTema } from '../hooks/useTema'
import { colors, typography } from '../styles/theme'

export default function ChoiceButtonGroup({ label, options = [], value, onChange, style }) {
  const botoesClaros = useSelector(state => state.botaoModo.botoesClaros)
  const tema = useTema()
  
  const selectedColor = botoesClaros ? tema.colors.primaryOrange : tema.colors.primary

  return (
    <View style={[styles.container, style]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.buttonsContainer}>
        {options.map((option) => {
          const selected = value === option.value
          return (
            <TouchableOpacity
              key={option.value}
              style={[
                styles.button,
                selected && { backgroundColor: selectedColor, borderColor: selectedColor },
              ]}
              onPress={() => onChange(option.value)}
            >
              <Text style={[styles.buttonText, selected && { color: tema.colors.white, fontWeight: 'bold' }]}>
                {option.label}
              </Text>
            </TouchableOpacity>
          )
        })}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 4,
    ...typography.body,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    backgroundColor: colors.surface,
    alignItems: 'center',
  },
  buttonText: {
    color: colors.textPrimary,
    fontSize: 14,
  },
})
