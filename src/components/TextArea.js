import React from 'react'
import { TextInput, StyleSheet, View, Text } from 'react-native'
import { useTema } from '../hooks/useTema'

export default function TextArea({ label, value, onChangeText, error }) {
  const tema = useTema()
  const { colors, typography } = tema
  
  return (
    <View style={styles.container}>
      {label && <Text style={[styles.label, { color: colors.textSecondary }]}>{label}</Text>}
      <TextInput
        style={[
          styles.input, 
          error && styles.errorInput,
          {
            backgroundColor: colors.surface,
            borderColor: error ? colors.error : colors.border,
            color: colors.textPrimary
          }
        ]}
        value={value}
        onChangeText={onChangeText}
        placeholder=""
        placeholderTextColor={colors.textSecondary}
        multiline
        numberOfLines={4}
        textAlignVertical="top"
      />
      {error && <Text style={[styles.errorText, { color: colors.error }]}>{error}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: { marginBottom: 16 },
  label: { 
    marginBottom: 4, 
    fontSize: 14,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    fontSize: 14,
  },
  errorInput: {},
  errorText: {
    marginTop: 4,
    fontSize: 12,
  },
})
