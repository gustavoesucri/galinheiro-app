// src/components/DateTimePickerField.js
import React, { useState } from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import { Text } from 'react-native-paper'
import { colors, typography } from '../styles/theme'

export default function DateTimePickerField({ label, date, onChange, error }) {
  const [show, setShow] = useState(false)

  const handleChange = (_, selectedDate) => {
    setShow(false)
    if (selectedDate) onChange(selectedDate)
  }

  return (
    <View style={styles.container}>
      <Text style={typography.label}>{label}</Text>

      <TouchableOpacity onPress={() => setShow(true)} style={styles.field}>
        <Text style={typography.body}>
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

      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: { marginBottom: 16 },
  field: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: colors.surface,
  },
  error: {
    color: colors.error,
    marginTop: 4,
    fontSize: 12,
  },
})
