import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useTema } from '../hooks/useTema'

export default function NumberInput({ label, value, onChange, min = 0, max = 20 }) {
  const tema = useTema()
  const { colors, typography } = tema
  
  const handleIncrease = () => {
    if (value < max) onChange(value + 1)
  }

  const handleDecrease = () => {
    if (value > min) onChange(value - 1)
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
          onPress={handleDecrease}
        >
          <Text style={[styles.buttonText, { color: colors.textPrimary }]}>−</Text>
        </TouchableOpacity>

        {/* Aumentei a largura mínima e centralizei o número */}
        <Text style={[styles.value, { color: colors.textPrimary }]}>{value}</Text>

        <TouchableOpacity 
          style={[
            styles.button, 
            { 
              backgroundColor: colors.surface, 
              borderColor: colors.border 
            }
          ]} 
          onPress={handleIncrease}
        >
          <Text style={[styles.buttonText, { color: colors.textPrimary }]}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { marginBottom: 16 },
  controls: { flexDirection: 'row', alignItems: 'center' },
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
  value: {
    minWidth: 60,          // garante largura mínima suficiente
    textAlign: 'center',    // centraliza o número
    marginHorizontal: 16,
    fontSize: 16,
  },
})
