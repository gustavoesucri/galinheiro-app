import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import { useRef } from 'react'
import { useTema } from '../hooks/useTema'

export default function NumberInput({ label, value, onChange, min = 0, max = 20 }) {
  const tema = useTema()
  const { colors, typography } = tema
  const holdTimerRef = useRef(null)
  const accelerationTimerRef = useRef(null)
  
  const handleIncrease = () => {
    if (value < max) onChange(value + 1)
  }

  const handleDecrease = () => {
    if (value > min) onChange(value - 1)
  }

  const handlePressIn = (direction) => {
    const increment = direction === 'up' ? 1 : -1
    
    // Primeiro clique imediato
    if (direction === 'up') {
      handleIncrease()
    } else {
      handleDecrease()
    }
    
    // Espera 1500ms antes de começar aceleração (mais lento que NumberSpinner)
    holdTimerRef.current = setTimeout(() => {
      const accelerate = () => {
        const newValue = value + increment
        if (newValue >= min && newValue <= max) {
          onChange(newValue)
        }
      }
      
      accelerate()
      accelerationTimerRef.current = setInterval(accelerate, 150)
    }, 1500)
  }

  const handlePressOut = () => {
    if (holdTimerRef.current) {
      clearTimeout(holdTimerRef.current)
      holdTimerRef.current = null
    }
    if (accelerationTimerRef.current) {
      clearInterval(accelerationTimerRef.current)
      accelerationTimerRef.current = null
    }
  }

  const handleTextChange = (text) => {
    // Remove caracteres não numéricos exceto sinal negativo
    const cleaned = text.replace(/[^0-9-]/g, '')
    if (cleaned === '' || cleaned === '-') {
      onChange(min)
      return
    }
    
    const numValue = parseInt(cleaned, 10)
    if (!isNaN(numValue)) {
      // Clamp dentro do range
      const clampedValue = Math.max(min, Math.min(max, numValue))
      onChange(clampedValue)
    }
  }

  const handleBlur = () => {
    // Garante que o valor final está dentro do range
    if (value < min) onChange(min)
    if (value > max) onChange(max)
  }

  return (
    <View style={styles.container}>
      <Text style={[typography.body, { color: colors.textPrimary }]}>{label}</Text>
      <View style={styles.controls}>
        <TouchableOpacity 
          style={[
            styles.button, 
            { 
              backgroundColor: colors.surface, 
              borderColor: colors.border 
            }
          ]} 
          onPressIn={() => handlePressIn('down')}
          onPressOut={handlePressOut}
        >
          <Text style={[styles.buttonText, { color: colors.textPrimary }]}>−</Text>
        </TouchableOpacity>

        <TextInput
          style={[
            styles.valueInput,
            { 
              color: colors.textPrimary,
              backgroundColor: colors.surface,
              borderColor: colors.border,
            }
          ]}
          value={String(value)}
          onChangeText={handleTextChange}
          onBlur={handleBlur}
          keyboardType="numeric"
          selectTextOnFocus
        />

        <TouchableOpacity 
          style={[
            styles.button, 
            { 
              backgroundColor: colors.surface, 
              borderColor: colors.border 
            }
          ]} 
          onPressIn={() => handlePressIn('up')}
          onPressOut={handlePressOut}
        >
          <Text style={[styles.buttonText, { color: colors.textPrimary }]}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { marginBottom: 16 },
  controls: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  button: {
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  valueInput: {
    minWidth: 70,
    textAlign: 'center',
    fontSize: 16,
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
})

