// src/components/CustomSliderField.js
import React, { useMemo } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Slider from '@react-native-community/slider'
import { colors, typography } from '../styles/theme'

export default function CustomSliderField({
  label,
  value = 0,
  onValueChange,
  min = 1,
  max = 100000,
  step = 1,
  unit = 'lux',
  error,
  logarithmic = true, // ativa modo logarítmico por padrão
}) {
  // === Transformações matemáticas ===
  // Slider sempre varia entre 0 e 1 internamente
  const sliderMin = 0
  const sliderMax = 1

  // Calcula valores intermediários
  const logMin = Math.log10(min)
  const logMax = Math.log10(max)

  // Valor do slider a partir do valor real
  const sliderValue = useMemo(() => {
    if (!logarithmic) return (value - min) / (max - min)
    return (Math.log10(value) - logMin) / (logMax - logMin)
  }, [value, min, max, logMin, logMax, logarithmic])

  // Quando o usuário move o slider
  const handleChange = (sliderVal) => {
    if (!logarithmic) {
      const newVal = min + sliderVal * (max - min)
      onValueChange(Math.round(newVal))
    } else {
      const logValue = logMin + sliderVal * (logMax - logMin)
      const newVal = Math.pow(10, logValue)
      onValueChange(Math.round(newVal))
    }
  }

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}

      <View style={styles.valueContainer}>
        <Text style={styles.valueText}>
          {value.toLocaleString()} {unit}
        </Text>
      </View>

      <Slider
        style={styles.slider}
        minimumValue={sliderMin}
        maximumValue={sliderMax}
        step={0.001}
        value={sliderValue}
        onValueChange={handleChange}
        minimumTrackTintColor={colors.primary}
        maximumTrackTintColor={colors.border}
        thumbTintColor={colors.primary}
      />

      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  valueContainer: {
    alignItems: 'flex-end',
    marginBottom: 4,
  },
  valueText: {
    ...typography.bodyBold,
    color: colors.textPrimary,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  error: {
    fontSize: 12,
    color: 'red',
    marginTop: 4,
  },
})
