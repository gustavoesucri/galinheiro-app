import React, { useState } from 'react'
import { View, Platform, Button as RNButton, StyleSheet } from 'react-native'
import { Text } from 'react-native-paper'
import { DatePickerModal } from 'react-native-paper-dates'
import { useTema } from '../hooks/useTema'

export default function DatePickerField({ label, date, onChange, error, fullWidth = true, disabled = false }) {
  const tema = useTema()
  const { colors } = tema
  const [open, setOpen] = useState(false)

  // Garante que date seja Date object
  const handleChange = (d) => {
    const newDate = d instanceof Date ? d : new Date(d)
    onChange(newDate)
  }

  if (Platform.OS === 'web') {
    return (
      <View style={[styles.container, !fullWidth && styles.containerCompact]}>
        <Text style={{ color: colors.textPrimary }}>{label}</Text>
        <input
          type="date"
          value={date ? date.toISOString().substr(0, 10) : ''}
          onChange={e => handleChange(e.target.value)}
          disabled={disabled}
          style={{ 
            padding: 8, 
            marginTop: 4, 
            maxWidth: fullWidth ? '100%' : 200,
            backgroundColor: disabled ? colors.disabled : colors.surface,
            color: disabled ? colors.textDisabled : colors.textPrimary,
            borderColor: colors.border,
            borderWidth: 1,
            borderRadius: 4,
            opacity: disabled ? 0.6 : 1,
          }}
        />
        {error && <Text style={{ color: colors.error }}>{error}</Text>}
      </View>
    )
  }

  return (
    <View style={[styles.container, !fullWidth && styles.containerCompact]}>
      <Text style={{ color: colors.textPrimary }}>{label}</Text>
      <View style={[styles.buttonWrapper, { 
        backgroundColor: disabled ? colors.disabled : colors.surface, 
        borderColor: colors.border,
        opacity: disabled ? 0.6 : 1,
      }]}>
        <RNButton
          title={date ? date.toLocaleDateString() : 'Selecionar data'}
          onPress={() => setOpen(true)}
          color={colors.primary}
          disabled={disabled}
        />
      </View>
      <DatePickerModal
        locale="pt"
        mode="single"
        visible={open}
        date={date}
        onDismiss={() => setOpen(false)}
        onConfirm={(d) => {
          setOpen(false)
          handleChange(d)
        }}
      />
      {error && <Text style={{ color: colors.error }}>{error}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: { marginBottom: 16 },
  containerCompact: {
    maxWidth: 200,
  },
  buttonWrapper: {
    marginTop: 4,
    borderWidth: 1,
    borderRadius: 8,
    overflow: 'hidden',
  },
})
