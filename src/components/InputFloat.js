import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { MaskedTextInput } from 'react-native-mask-text'
import { colors, typography } from '../styles/theme'

export default function InputFloat({
  label,
  value,
  onChange,
  placeholder = '100,00',
  style,
  error,
  ...props
}) {
  const handleChange = (masked, unmasked) => {
    // unmasked = string só com números, ex: "12345" -> 123.45
    const numericValue = parseFloat(unmasked) / 100
    onChange(isNaN(numericValue) ? '' : numericValue)
  }

  return (
    <View style={[styles.container, style]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <MaskedTextInput
        mask="99999,99"
        keyboardType="numeric"
        placeholder={placeholder}
        placeholderTextColor={colors.textSecondary}
        value={value ? value.toString().replace('.', ',') : ''}
        onChangeText={handleChange}
        style={[styles.input, error && styles.inputError]}
        {...props}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 4,
    ...typography.body,
  },
  input: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: colors.textPrimary,
    fontSize: 14,
  },
  inputError: {
    borderColor: colors.error || 'red',
  },
  errorText: {
    color: colors.error || 'red',
    fontSize: 12,
    marginTop: 4,
  },
})
