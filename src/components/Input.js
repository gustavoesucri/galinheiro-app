import { View, Text, TextInput, StyleSheet } from 'react-native'
import { colors, typography } from '../styles/theme'

export default function Input({ label, value, onChangeText, keyboardType = 'default', style, fullWidth = true, ...props }) {
  return (
    <View style={[styles.container, !fullWidth && styles.containerCompact, style]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        style={[styles.input, !fullWidth && styles.inputCompact]}
        placeholder=""
        {...props}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  containerCompact: {
    maxWidth: 200,
  },
  label: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 4,
    ...typography.body,
  },
  input: {
    backgroundColor: colors.surface, // branco
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: colors.textPrimary,
    fontSize: 14,
  },
  inputCompact: {
    maxWidth: 200,
  },
})
