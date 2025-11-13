// src/components/DateTimePickerField.js
import React, { useState } from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import { Text } from 'react-native-paper'
import { useTema } from '../hooks/useTema'

export default function DateTimePickerField({ label, date, onChange, error, fullWidth = true }) {
  const tema = useTema()
  const { colors, typography } = tema
  const [show, setShow] = useState(false)

  const handleChange = (_, selectedDate) => {
    setShow(false)
    if (selectedDate) onChange(selectedDate)
  }

  return (
    <View style={[styles.container, !fullWidth && styles.containerCompact]}>
      <Text style={[typography.label, { color: colors.textPrimary }]}>{label}</Text>

      <TouchableOpacity 
        onPress={() => setShow(true)} 
        style={[
          styles.field, 
          !fullWidth && styles.fieldCompact,
          { 
            backgroundColor: colors.surface,
            borderColor: colors.border
          }
        ]}
      >
        <Text style={[typography.body, { color: colors.textPrimary }]}>
          {date
            ? `${date.toLocaleDateString()} ${date.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}`
            : 'Selecione a data e hora'}
        </Text>
      </TouchableOpacity>

      {show && (
        <DateTimePicker
          value={date || new Date()}
          mode="datetime"
          display="default"
          onChange={handleChange}
        />
      )}

      {error && <Text style={[styles.error, { color: colors.error }]}>{error}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: { marginBottom: 16 },
  containerCompact: {
    maxWidth: 200,
  },
  field: {
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  fieldCompact: {
    maxWidth: 200,
  },
  error: {
    marginTop: 4,
    fontSize: 12,
  },
})
