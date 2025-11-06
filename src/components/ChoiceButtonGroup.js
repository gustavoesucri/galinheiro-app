import React from 'react'
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native'
import { colors, typography } from '../styles/theme'

export default function ChoiceButtonGroup({ label, options = [], value, onChange, style }) {
  return (
    <View style={[styles.container, style]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.buttonsContainer}>
        {options.map((option) => {
          const selected = value === option.value
          return (
            <TouchableOpacity
              key={option.value}
              style={[
                styles.button,
                selected && styles.buttonSelected,
              ]}
              onPress={() => onChange(option.value)}
            >
              <Text style={[styles.buttonText, selected && styles.buttonTextSelected]}>
                {option.label}
              </Text>
            </TouchableOpacity>
          )
        })}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 4,
    ...typography.body,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    backgroundColor: colors.surface,
    alignItems: 'center',
  },
  buttonSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  buttonText: {
    color: colors.textPrimary,
    fontSize: 14,
  },
  buttonTextSelected: {
    color: '#fff',
    fontWeight: 'bold',
  },
})
