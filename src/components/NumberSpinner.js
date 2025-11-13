import React, { useState, useRef, useEffect } from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import { Text } from 'react-native-paper'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { colors, typography } from '../styles/theme'

export default function NumberSpinner({ value, onChange, label, step = 0.1, min = 0, max = 100 }) {
  const [isPressed, setIsPressed] = useState(null) // 'increase' ou 'decrease'
  const intervalRef = useRef(null)
  const valueRef = useRef(value)

  // Atualiza a ref sempre que value muda
  useEffect(() => {
    valueRef.current = value
  }, [value])

  // Calcula velocidade baseada no valor
  const getSpeed = () => {
    const absValue = Math.abs(valueRef.current)
    if (absValue >= 10) return 10 // 10 vezes mais rápido
    if (absValue >= 2) return 5   // 5 vezes mais rápido
    return 1                       // Normal
  }

  const handlePressIn = (direction) => {
    setIsPressed(direction)
    
    // Primeiro incremento imediato
    const newValue = direction === 'increase' ? valueRef.current + step : valueRef.current - step
    const clampedValue = Math.max(min, Math.min(max, parseFloat(newValue.toFixed(2))))
    onChange(clampedValue)

    // Começar intervalo após 500ms
    intervalRef.current = setTimeout(() => {
      const speed = getSpeed()
      const repeatInterval = setInterval(() => {
        const current = valueRef.current
        const newVal = direction === 'increase' ? current + step : current - step
        const clampedVal = Math.max(min, Math.min(max, parseFloat(newVal.toFixed(2))))
        onChange(clampedVal)
      }, 100 / speed) // Divide o tempo por velocidade (mais rápido)

      intervalRef.current = repeatInterval
    }, 500)
  }

  const handlePressOut = () => {
    setIsPressed(null)
    if (intervalRef.current) {
      clearTimeout(intervalRef.current)
      clearInterval(intervalRef.current)
    }
  }

  return (
    <View style={styles.container}>
      {label && <Text style={typography.label}>{label}</Text>}

      <View style={styles.spinner}>
        <TouchableOpacity
          style={[styles.button, isPressed === 'decrease' && styles.buttonActive]}
          onPressIn={() => handlePressIn('decrease')}
          onPressOut={handlePressOut}
          activeOpacity={0.7}
        >
          <MaterialCommunityIcons name="minus" size={20} color={colors.primary} />
        </TouchableOpacity>

        <View style={styles.valueContainer}>
          <Text style={styles.value}>{value.toFixed(1)}</Text>
        </View>

        <TouchableOpacity
          style={[styles.button, isPressed === 'increase' && styles.buttonActive]}
          onPressIn={() => handlePressIn('increase')}
          onPressOut={handlePressOut}
          activeOpacity={0.7}
        >
          <MaterialCommunityIcons name="plus" size={20} color={colors.primary} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  spinner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    marginTop: 8,
  },
  button: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.surface,
    borderWidth: 2,
    borderColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonActive: {
    backgroundColor: colors.primary,
  },
  valueContainer: {
    width: 70,
    height: 44,
    borderRadius: 8,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.primary,
  },
  value: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.primary,
  },
})
