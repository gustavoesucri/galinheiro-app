import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'
import { useTema } from '../hooks/useTema'
import { colors, typography } from '../styles/theme'

export default function RadioButtonGroup({ label, options, value, onChange }) {
  const botoesClaros = useSelector(state => state.botaoModo.botoesClaros)
  const tema = useTema()
  
  const selectedColor = botoesClaros ? tema.colors.primaryOrange : tema.colors.primary

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}

      <View style={styles.optionsContainer}>
        {options.map((opt) => (
          <TouchableOpacity
            key={opt.value}
            style={styles.option}
            onPress={() => onChange(opt.value)}
          >
            <View
              style={[
                styles.radioOuter,
                value === opt.value && { borderColor: selectedColor },
              ]}
            >
              {value === opt.value && <View style={[styles.radioInner, { backgroundColor: selectedColor }]} />}
            </View>
            <Text style={styles.optionText}>{opt.label}</Text>
          </TouchableOpacity>
        ))}
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
    marginBottom: 8,
    ...typography.body,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    marginBottom: 8,
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  optionText: {
    marginLeft: 8,
    color: colors.textPrimary,
  },
})
