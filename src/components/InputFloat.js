import React from 'react'
import { View, Text, StyleSheet, TextInput } from 'react-native'
import { useTema } from '../hooks/useTema'

export default function InputFloat({
  label,
  value,
  onChange,
  placeholder = '0,00',
  style,
  error,
  fullWidth = true,
  ...props
}) {
  const tema = useTema()
  const { colors, typography } = tema
  
  const formatNumber = (numStr) => {
    // Mantém só números
    const digits = numStr.replace(/\D/g, '')

    // Limite máximo: 99999,99 → até 7 dígitos
    if (digits.length > 7) return value?.toFixed?.(2)?.toString().replace('.', ',') || ''

    // Converte para número e aplica duas casas
    const numeric = parseFloat(digits) / 100
    if (isNaN(numeric)) return ''

    // Garante mínimo visual de 0,01 (mas não interfere na digitação)
    return numeric.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  }

  const handleChange = (text) => {
    const digits = text.replace(/\D/g, '')
    const numeric = parseFloat(digits) / 100
    if (digits.length > 7) return
    onChange(isNaN(numeric) ? '' : numeric)
  }

  return (
    <View style={[styles.container, !fullWidth && styles.containerCompact, style]}>
      {label && <Text style={[styles.label, { color: colors.textSecondary }, typography.body]}>{label}</Text>}
      <TextInput
        keyboardType="numeric"
        placeholder={placeholder}
        placeholderTextColor={colors.textSecondary}
        value={
          value !== undefined && value !== null && value !== ''
            ? value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
            : ''
        }
        onChangeText={handleChange}
        style={[
          styles.input, 
          !fullWidth && styles.inputCompact, 
          error && styles.inputError,
          {
            backgroundColor: colors.surface,
            borderColor: error ? colors.error : colors.border,
            color: colors.textPrimary
          }
        ]}
        {...props}
      />
      {error && <Text style={[styles.errorText, { color: colors.error }]}>{error}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: { marginBottom: 12 },
  containerCompact: {
    maxWidth: 200,
  },
  label: {
    fontSize: 14,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
  },
  inputCompact: {
    maxWidth: 200,
  },
  inputError: {},
  errorText: {
    fontSize: 12,
    marginTop: 4,
  },
})
