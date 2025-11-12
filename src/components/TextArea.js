import React from 'react'
import { TextInput, StyleSheet, View, Text } from 'react-native'
import { colors, typography } from '../styles/theme'

export default function TextArea({ label, value, onChangeText, error }) {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={[styles.input, error && styles.errorInput]}
        value={value}
        onChangeText={onChangeText}
        placeholder=""
        multiline
        numberOfLines={4}
        textAlignVertical="top"
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: { marginBottom: 16 },
  label: { 
    marginBottom: 4, 
    fontSize: typography.label.fontSize, 
    color: colors.textPrimary 
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 8,
    fontSize: typography.body.fontSize,
    backgroundColor: colors.surface,
  },
  errorInput: {
    borderColor: colors.error,
  },
  errorText: {
    marginTop: 4,
    color: colors.error,
    fontSize: 12,
  },
})
