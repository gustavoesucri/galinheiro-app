// src/components/NumberInput.js
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { colors, typography } from '../styles/theme'

export default function NumberInput({ label, value, onChange, min = 0, max = 20 }) {
  const handleIncrease = () => {
    if (value < max) onChange(value + 1)
  }

  const handleDecrease = () => {
    if (value > min) onChange(value - 1)
  }

  return (
    <View style={styles.container}>
      <Text style={typography.body}>{label}</Text>
      <View style={styles.controls}>
        <TouchableOpacity style={styles.button} onPress={handleDecrease}>
          <Text style={styles.buttonText}>−</Text>
        </TouchableOpacity>
        <Text style={styles.value}>{value}</Text>
        <TouchableOpacity style={styles.button} onPress={handleIncrease}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { marginBottom: 16 },
  controls: { flexDirection: 'row', alignItems: 'center' },
  button: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 20,
    color: colors.textPrimary,
    fontWeight: 'bold',
  },
  value: {
    marginHorizontal: 16,
    fontSize: 16,
    color: colors.textPrimary,
  },
})
