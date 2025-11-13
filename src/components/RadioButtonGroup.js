import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'
import { useTema } from '../hooks/useTema'

export default function RadioButtonGroup({ label, options, value, onChange }) {
  const botoesClaros = useSelector(state => state.botaoModo.botoesClaros)
  const tema = useTema()
  const { colors, typography } = tema
  
  const selectedColor = botoesClaros ? tema.colors.primaryOrange : tema.colors.primary

  return (
    <View style={styles.container}>
      {label && <Text style={[styles.label, { color: colors.textSecondary }, typography.body]}>{label}</Text>}

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
                { borderColor: value === opt.value ? selectedColor : colors.border },
              ]}
            >
              {value === opt.value && <View style={[styles.radioInner, { backgroundColor: selectedColor }]} />}
            </View>
            <Text style={[styles.optionText, { color: colors.textPrimary }]}>{opt.label}</Text>
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
    marginBottom: 8,
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
  },
})
