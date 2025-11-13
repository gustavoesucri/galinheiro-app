import React, { useState, useRef, useEffect } from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import { Text } from 'react-native-paper'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useSelector } from 'react-redux'
import { useTema } from '../hooks/useTema'

export default function NumberSpinner({ value, onChange, label, step = 0.1, min = 0, max = 100 }) {
  const [isPressed, setIsPressed] = useState(null) // 'increase' ou 'decrease'
  const intervalRef = useRef(null)
  const valueRef = useRef(value)
  const botoesClaros = useSelector(state => state.botaoModo.botoesClaros)
  const temaSelecionado = useSelector(state => state.tema.ativo)
  const tema = useTema()
  
  // Cor dinâmica - textPrimary no dark theme (cinza clarinho), senão cor normal
  const spinnerColor = temaSelecionado === 'dark' 
    ? tema.colors.textPrimary 
    : (botoesClaros ? tema.colors.primaryOrange : tema.colors.primary)

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
      {label && <Text style={[tema.typography.label, { color: tema.colors.textPrimary }]}>{label}</Text>}

      <View style={styles.spinner}>
        <TouchableOpacity
          style={[
            styles.button,
            { borderColor: spinnerColor, backgroundColor: tema.colors.surface },
            isPressed === 'decrease' && { backgroundColor: spinnerColor }
          ]}
          onPressIn={() => handlePressIn('decrease')}
          onPressOut={handlePressOut}
          activeOpacity={0.7}
        >
          <MaterialCommunityIcons 
            name="minus" 
            size={20} 
            color={isPressed === 'decrease' ? tema.colors.textOnPrimary : spinnerColor} 
          />
        </TouchableOpacity>

        <View style={[
          styles.valueContainer,
          { borderColor: spinnerColor, backgroundColor: tema.colors.surface }
        ]}>
          <Text style={[styles.value, { color: tema.colors.textPrimary }]}>{value.toFixed(1)}</Text>
        </View>

        <TouchableOpacity
          style={[
            styles.button,
            { borderColor: spinnerColor, backgroundColor: tema.colors.surface },
            isPressed === 'increase' && { backgroundColor: spinnerColor }
          ]}
          onPressIn={() => handlePressIn('increase')}
          onPressOut={handlePressOut}
          activeOpacity={0.7}
        >
          <MaterialCommunityIcons 
            name="plus" 
            size={20} 
            color={isPressed === 'increase' ? tema.colors.textOnPrimary : spinnerColor} 
          />
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
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  valueContainer: {
    width: 70,
    height: 44,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  value: {
    fontSize: 18,
    fontWeight: '600',
  },
})
