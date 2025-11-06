// src/components/SliderInput.js
import { View, Text, StyleSheet } from 'react-native'
import Slider from '@react-native-community/slider'
import { colors, typography } from '../styles/theme'

export default function SliderInput({ label, value, onChange, min = 0, max = 10 }) {
  return (
    <View style={styles.container}>
      <Text style={typography.body}>{label}: {value}</Text>
      <Slider
        minimumValue={min}
        maximumValue={max}
        step={1}
        value={value}
        onValueChange={onChange}
        minimumTrackTintColor={colors.primary}
        maximumTrackTintColor={colors.border}
        thumbTintColor={colors.accent}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
})
